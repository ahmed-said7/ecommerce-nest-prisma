"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
class ReviewService {
    constructor(prisma, api) {
        this.prisma = prisma;
        this.api = api;
    }
    ;
    async createReview(body, user) {
        const product = await this.prisma.product.findUnique({ where: { id: body.productId } });
        if (!product) {
            throw new common_1.HttpException("Product not found", 400);
        }
        ;
        let review = await this.prisma.review.findFirst({ where: {
                userId: user.id,
                productId: body.productId
            } });
        if (review) {
            throw new common_1.HttpException("user has review product already", 400);
        }
        ;
        body.userId = user.id;
        review = await this.prisma.review.create({
            data: body,
            include: { user: true }
        });
        this.aggregation(review.productId);
        return { review };
    }
    ;
    async getAllReviews(query) {
        const { obj } = this.api.filter(query)
            .sort().select().pagination().include({ user: true });
        const reviews = await this.prisma.review.findMany(obj);
        return { reviews };
    }
    ;
    async getReview(id) {
        const review = await this.prisma.review
            .findUnique({ where: { id }, select: { user: true } });
        if (!review) {
            throw new common_1.HttpException("Review not found", 400);
        }
        ;
        return { review };
    }
    ;
    async deleteReview(id, user) {
        try {
            const review = await this.prisma.review.delete({ where: { id, userId: user.id } });
            this.aggregation(review.productId);
            return { review };
        }
        catch (e) {
            throw new common_1.HttpException("Review not found", 400);
        }
        ;
    }
    ;
    async updateRrview(id, body, user) {
        try {
            const review = await this.prisma.review.
                update({ where: { id, userId: user.id }, include: { user: true }, data: body });
            if (body.rating) {
                this.aggregation(review.productId);
            }
            ;
            return { review };
        }
        catch (e) {
            throw new common_1.HttpException("review not found", 400);
        }
        ;
    }
    ;
    async aggregation(productId) {
        const result = await this.prisma.review.groupBy({
            where: { productId },
            by: "productId",
            _count: { rating: true },
            _avg: { rating: true }
        });
        if (result.length > 0) {
            await this.prisma.product.update({
                where: { id: productId },
                data: {
                    ratingAverage: result[0]._avg.rating,
                    ratingQuantity: result[0]._count.rating
                }
            });
        }
        else {
            await this.prisma.product.update({
                where: { id: productId },
                data: {
                    ratingAverage: 0,
                    ratingQuantity: 0
                }
            });
        }
    }
    ;
}
exports.ReviewService = ReviewService;
;
//# sourceMappingURL=review.service.js.map