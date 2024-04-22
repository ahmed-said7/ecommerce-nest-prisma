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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const api_service_1 = require("../Api/api.service");
let CouponService = class CouponService {
    constructor(prisma, api) {
        this.prisma = prisma;
        this.api = api;
    }
    ;
    async validateName(name) {
        const coupon = await this.prisma.coupon.findFirst({ where: { name } });
        if (coupon) {
            throw new common_1.HttpException("try another coupon code", 400);
        }
        ;
    }
    ;
    async createCoupon(body) {
        this.validateName(body.name);
        const coupon = await this.prisma.coupon.create({ data: body });
        return { coupon };
    }
    ;
    async getCoupon(id) {
        const coupon = await this.prisma.coupon.
            findUnique({ where: { id } });
        if (!coupon) {
            throw new common_1.HttpException("coupon not found", 400);
        }
        ;
        return { coupon };
    }
    ;
    async deleteCoupon(id) {
        try {
            const coupon = await this.prisma.coupon.delete({ where: { id } });
            return { status: "deleted" };
        }
        catch (e) {
            throw new common_1.HttpException("coupon not found", 400);
        }
        ;
    }
    ;
    async getAllCoupons(query) {
        const { obj } = this.api.filter(query).sort()
            .select().pagination().include();
        const coupons = await this.prisma.coupon.findMany(obj);
        return { coupons };
    }
    ;
    async updateCoupon(id, body) {
        if (body.name) {
            this.validateName(body.name);
        }
        ;
        try {
            const coupon = await this.prisma.
                coupon.update({ where: { id }, data: body });
            return { coupon };
        }
        catch (e) {
            throw new common_1.HttpException("coupon not found", 400);
        }
        ;
    }
    ;
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, api_service_1.ApiService])
], CouponService);
;
//# sourceMappingURL=coupon.service.js.map