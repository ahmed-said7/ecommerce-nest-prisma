"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const api_module_1 = require("../Api/api.module");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
        imports: [prisma_module_1.PrismaModule, api_module_1.ApiModule]
    })
], ProductModule);
;
//# sourceMappingURL=product.module.js.map