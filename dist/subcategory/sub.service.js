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
exports.SubcatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const api_service_1 = require("../Api/api.service");
let SubcatService = class SubcatService {
    constructor(prisma, api) {
        this.prisma = prisma;
        this.api = api;
    }
    ;
    async validateCat(id) {
        const cat = await this.prisma.category.findUnique({ where: { id } });
        if (!cat) {
            throw new common_1.HttpException("category not found", 400);
        }
        ;
    }
    ;
    async createSubcat(body) {
        this.validateCat(body.categoryId);
        const sub = await this.prisma.subcategory.create({ data: body });
        return { subctegory: sub };
    }
    ;
    async getSubcat(id) {
        const subcat = await this.prisma.subcategory.
            findUnique({ where: { id }, include: { category: true } });
        if (!subcat) {
            throw new common_1.HttpException("subcat not found", 400);
        }
        ;
        return { subcategory: subcat };
    }
    ;
    async deleteSubcat(id) {
        try {
            const subcategory = await this.prisma.subcategory.delete({ where: { id } });
            return { subcategory, status: "deleted" };
        }
        catch (e) {
            throw new common_1.HttpException("subcategory not found", 400);
        }
        ;
    }
    ;
    async getAllSubcategories(query) {
        const { obj } = this.api.filter(query).sort()
            .select().pagination().include({ category: true });
        const subcategories = await this.prisma.subcategory.findMany(obj);
        return { subcategories };
    }
    ;
    async updateSubcategories(id, body) {
        if (body.categoryId) {
            this.validateCat(body.categoryId);
        }
        ;
        try {
            const subcategory = await this.prisma.
                subcategory.update({ where: { id }, data: body });
            return { subcategory };
        }
        catch (e) {
            throw new common_1.HttpException("subcategory not found", 400);
        }
        ;
    }
    ;
};
exports.SubcatService = SubcatService;
exports.SubcatService = SubcatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, api_service_1.ApiService])
], SubcatService);
;
//# sourceMappingURL=sub.service.js.map