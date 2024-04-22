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
exports.BrandController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const file_interceptor_1 = require("../common/interceptor/file.interceptor");
const brand_update_dto_1 = require("./dto/brand.update.dto");
const brand_create_dto_1 = require("./dto/brand.create.dto");
const brand_query_dto_1 = require("./dto/brand.query.dto");
const brand_service_1 = require("./brand.service");
const authentication_guard_1 = require("../common/guard/authentication.guard");
const authorization_guard_1 = require("../common/guard/authorization.guard");
const user_service_1 = require("../user/user.service");
let BrandController = class BrandController {
    constructor(brandService) {
        this.brandService = brandService;
    }
    ;
    getAllBrands(query) {
        return this.brandService.getAllBrands(query);
    }
    ;
    createBrand(body) {
        console.log(body);
        return this.brandService.createBrand(body);
    }
    ;
    getBrand(id) {
        return this.brandService.getBrand(id);
    }
    ;
    deleteBrand(id) {
        return this.brandService.deleteBrand(id);
    }
    ;
    updateBrand(id, body) {
        return this.brandService.updateBrand(id, body);
    }
    ;
};
exports.BrandController = BrandController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brand_query_dto_1.BrandQueryDto]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "getAllBrands", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.ResizeSingleFileInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brand_create_dto_1.CreateBrandDto]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "createBrand", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.user, user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "getBrand", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "deleteBrand", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.ResizeSingleFileInterceptor),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, brand_update_dto_1.UpdateBrandDto]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "updateBrand", null);
exports.BrandController = BrandController = __decorate([
    (0, common_1.Controller)("brand"),
    __metadata("design:paramtypes", [brand_service_1.BrandService])
], BrandController);
;
//# sourceMappingURL=brand.controller.js.map