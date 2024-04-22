"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const api_service_1 = require("../Api/api.service");
let ProductService = class ProductService {
    constructor(prisma, api) {
        this.prisma = prisma;
        this.api = api;
    }
    ;
    async validateBrandId(brandId) {
        const brand = await this.prisma.brand.findUnique({ where: { id: brandId } });
        if (!brand) {
            throw new common_1.HttpException("brand not found", 400);
        }
        ;
    }
    ;
    async validateCategoryId(categoryId) {
        const cat = await this.prisma.category.findUnique({ where: { id: categoryId } });
        if (!cat) {
            throw new common_1.HttpException("category not found", 400);
        }
        ;
    }
    ;
    async validateSubcategoryIds(subIds) {
        const subcats = await this.prisma.subcategory
            .findMany({ where: { id: { in: subIds } }, select: { id: true } });
        if (subcats.length !== subIds.length) {
            throw new common_1.HttpException("Subcategory ids is not valid", 400);
        }
        ;
        return subcats;
    }
    ;
    async getProduct(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.HttpException("product not found", 400);
        }
        ;
        return { product };
    }
    ;
    async deleteProduct(id) {
        try {
            const product = await this.prisma.product.delete({ where: { id } });
            return { product, status: "deleted" };
        }
        catch (err) {
            throw new common_1.HttpException("Product not found", 400);
        }
        ;
    }
    ;
    async createProd(body) {
        this.validateBrandId(body.brandId);
        this.validateCategoryId(body.categoryId);
        const subcats = await this.validateSubcategoryIds(body.subcategories);
        delete body.subcategories;
        const product = await this.prisma.product.create({
            data: { ...body, subcategories: { connect: subcats } }
        });
        return { product };
    }
    ;
    async getAllprods(query) {
        const obj = this.api.filter(query).sort().select()
            .pagination()
            .include({ brand: true, subcategory: true, category: true }).obj;
        const products = await this.prisma.product.findMany(obj);
        return { products };
    }
    ;
    async updateProd(productId, body) {
        if (body.brandId) {
            this.validateBrandId(body.brandId);
        }
        ;
        if (body.categoryId) {
            this.validateBrandId(body.categoryId);
        }
        ;
        try {
            const product = await this.prisma.product.update({
                where: { id: productId },
                data: body
            });
            return { product };
        }
        catch (e) {
            throw new common_1.HttpException(`product not found`, 400);
        }
        ;
    }
    ;
    async updateProductSubcategories(id, body) {
        const subcats = await this.validateSubcategoryIds(body.subcategories);
        try {
            const product = await this.prisma.product.update({
                where: { id },
                data: { subcategories: { connect: subcats } }
            });
            return { product };
        }
        catch (e) {
            throw new common_1.HttpException("Product not found", 400);
        }
    }
    ;
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, api_service_1.ApiService])
], ProductService);
;
//# sourceMappingURL=product.service.js.map