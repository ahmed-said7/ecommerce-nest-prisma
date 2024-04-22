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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const api_service_1 = require("../Api/api.service");
let CategoryService = class CategoryService {
    constructor(prisma, api) {
        this.prisma = prisma;
        this.api = api;
    }
    ;
    async createCat(body) {
        const category = await this.prisma.category.create({ data: body });
        return { category };
    }
    ;
    async getAllCategories(query) {
        const { obj } = this.api.filter(query).sort().select()
            .pagination().include();
        const categories = await this.prisma.category.findMany(obj);
        return { categories };
    }
    ;
    async getCat(id) {
        const cat = await this.prisma.category.findUnique({ where: { id } });
        if (!cat) {
            throw new common_1.HttpException("category not found", 400);
        }
        ;
        return { category: cat };
    }
    ;
    async deleteCat(id) {
        try {
            const category = await this.prisma.category.delete({ where: { id } });
            return { category, status: "deleted" };
        }
        catch (e) {
            throw new common_1.HttpException("category not found", 400);
        }
    }
    ;
    async updateCat(id, body) {
        try {
            const category = await this.prisma.category.update({
                where: { id }, data: body
            });
            return { category };
        }
        catch (e) {
            throw new common_1.HttpException("category not found", 400);
        }
    }
    ;
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, api_service_1.ApiService])
], CategoryService);
;
//# sourceMappingURL=category.service.js.map