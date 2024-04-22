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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const query_dto_1 = require("./dto/query.dto");
const category_service_1 = require("./category.service");
const create_category_1 = require("./dto/create.category");
const platform_express_1 = require("@nestjs/platform-express");
const file_interceptor_1 = require("../common/interceptor/file.interceptor");
const update_category_dto_1 = require("./dto/update.category.dto");
const authentication_guard_1 = require("../common/guard/authentication.guard");
const authorization_guard_1 = require("../common/guard/authorization.guard");
const user_service_1 = require("../user/user.service");
let CategoryController = class CategoryController {
    constructor(catService) {
        this.catService = catService;
    }
    ;
    getAllCats(query) {
        return this.catService.getAllCategories(query);
    }
    ;
    createCat(body) {
        console.log(body);
        return this.catService.createCat(body);
    }
    ;
    getCat(id) {
        return this.catService.getCat(id);
    }
    ;
    deleteCat(id) {
        return this.catService.deleteCat(id);
    }
    ;
    updateCat(id, body) {
        return this.catService.updateCat(id, body);
    }
    ;
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.CategoryQuery]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getAllCats", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.ResizeSingleFileInterceptor),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "createCat", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getCat", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "deleteCat", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.ResizeSingleFileInterceptor),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "updateCat", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)("category"),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
;
//# sourceMappingURL=category.controller.js.map