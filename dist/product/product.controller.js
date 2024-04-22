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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const file_field_interceptor_1 = require("../common/interceptor/file.field.interceptor");
const product_service_1 = require("./product.service");
const product_query_dto_1 = require("./dto/product.query.dto");
const product_update_dto_1 = require("./dto/product.update.dto");
const product_create_dto_1 = require("./dto/product.create.dto");
const product_interceptor_1 = require("../common/interceptor/product.interceptor");
const authentication_guard_1 = require("../common/guard/authentication.guard");
const authorization_guard_1 = require("../common/guard/authorization.guard");
const user_service_1 = require("../user/user.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    createProduct(body) {
        return this.productService.createProd(body);
    }
    ;
    updateSubcatProduct(id, body) {
        return this.productService.updateProductSubcategories(id, body);
    }
    ;
    updateProduct(id, body) {
        return this.productService.updateProd(id, body);
    }
    ;
    getProducts(query) {
        return this.productService.getAllprods(query);
    }
    ;
    deleteProduct(id) {
        return this.productService.deleteProduct(id);
    }
    ;
    getProduct(id) {
        return this.productService.getProduct(id);
    }
    ;
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    (0, common_1.UseInterceptors)((0, file_field_interceptor_1.fieldsInterceptor)("images", "imageCover"), product_interceptor_1.ResizeProductFilesInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_create_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)("sub/:id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_update_dto_1.UpdateRelationsDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateSubcatProduct", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    (0, common_1.UseInterceptors)((0, file_field_interceptor_1.fieldsInterceptor)("images", "imageCover"), product_interceptor_1.ResizeProductFilesInterceptor),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_update_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_query_dto_1.ProductQueryDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)("product"),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
;
//# sourceMappingURL=product.controller.js.map