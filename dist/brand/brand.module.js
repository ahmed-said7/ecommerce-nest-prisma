"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const api_module_1 = require("../Api/api.module");
const brand_service_1 = require("./brand.service");
const brand_controller_1 = require("./brand.controller");
let BrandModule = class BrandModule {
};
exports.BrandModule = BrandModule;
exports.BrandModule = BrandModule = __decorate([
    (0, common_1.Module)({
        controllers: [brand_controller_1.BrandController],
        providers: [brand_service_1.BrandService, { provide: "folder", useValue: "brand" }],
        imports: [prisma_module_1.PrismaModule, api_module_1.ApiModule]
    })
], BrandModule);
;
//# sourceMappingURL=brand.module.js.map