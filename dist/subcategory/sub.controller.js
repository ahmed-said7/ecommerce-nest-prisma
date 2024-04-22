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
exports.SubcatController = void 0;
const common_1 = require("@nestjs/common");
const sub_service_1 = require("./sub.service");
const create_sub_dto_1 = require("./dto/create.sub.dto");
const platform_express_1 = require("@nestjs/platform-express");
const file_interceptor_1 = require("../common/interceptor/file.interceptor");
const query_dto_1 = require("./dto/query.dto");
const update_dto_1 = require("./dto/update.dto");
const authentication_guard_1 = require("../common/guard/authentication.guard");
const authorization_guard_1 = require("../common/guard/authorization.guard");
const user_service_1 = require("../user/user.service");
let SubcatController = class SubcatController {
    constructor(SubService) {
        this.SubService = SubService;
    }
    ;
    getAllSub(query) {
        return this.SubService.getAllSubcategories(query);
    }
    ;
    getSub(id) {
        return this.SubService.getSubcat(id);
    }
    ;
    createSub(body) {
        return this.SubService.createSubcat(body);
    }
    ;
    updateSub(body, id) {
        return this.SubService.updateSubcategories(id, body);
    }
    ;
    deleteSub(id) {
        return this.SubService.deleteSubcat(id);
    }
    ;
};
exports.SubcatController = SubcatController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.SubcatQueryDto]),
    __metadata("design:returntype", void 0)
], SubcatController.prototype, "getAllSub", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubcatController.prototype, "getSub", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.ResizeSingleFileInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_dto_1.CreateSubcatDto]),
    __metadata("design:returntype", void 0)
], SubcatController.prototype, "createSub", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.ResizeSingleFileInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateSubcatDto, Number]),
    __metadata("design:returntype", void 0)
], SubcatController.prototype, "updateSub", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubcatController.prototype, "deleteSub", null);
exports.SubcatController = SubcatController = __decorate([
    (0, common_1.Controller)("subcat"),
    __metadata("design:paramtypes", [sub_service_1.SubcatService])
], SubcatController);
;
//# sourceMappingURL=sub.controller.js.map