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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const api_service_1 = require("../Api/api.service");
let BrandService = class BrandService {
    constructor(prisma, api) {
        this.prisma = prisma;
        this.api = api;
    }
    ;
    async createBrand(body) {
        const brand = await this.prisma.brand.create({ data: body });
        return { brand };
    }
    ;
    async getAllBrands(query) {
        const { obj } = this.api.filter(query).sort()
            .select().pagination().include();
        const brands = await this.prisma.brand.findMany(obj);
        return { brands };
    }
    ;
    async getBrand(id) {
        const brand = await this.prisma.brand.findUnique({ where: { id } });
        if (!brand) {
            throw new common_1.HttpException("brand not found", 400);
        }
        ;
        return { brand };
    }
    ;
    async deleteBrand(id) {
        try {
            const brand = await this.prisma.brand.delete({ where: { id } });
            return { brand, status: "deleted" };
        }
        catch (e) {
            throw new common_1.HttpException("brand not found", 400);
        }
    }
    ;
    async updateBrand(id, body) {
        try {
            const brand = await this.prisma.brand.update({
                where: { id }, data: body
            });
            return { brand };
        }
        catch (e) {
            throw new common_1.HttpException("brand not found", 400);
        }
    }
    ;
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, api_service_1.ApiService])
], BrandService);
;
//# sourceMappingURL=brand.service.js.map