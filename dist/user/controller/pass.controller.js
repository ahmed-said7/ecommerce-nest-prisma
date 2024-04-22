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
exports.PassController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorator/current.user.decorator");
const authentication_guard_1 = require("../../common/guard/authentication.guard");
const change_pass_dto_1 = require("../dto/change.pass.dto");
const user_service_1 = require("../user.service");
let PassController = class PassController {
    constructor(UserService) {
        this.UserService = UserService;
    }
    ;
    login(body, user) {
        return this.UserService.changeLoggedUserPassword(body, user);
    }
    ;
    sendResetCode(email) {
        return this.UserService.forgetPassword(email);
    }
    ;
    deleteMe(code, body) {
        return this.UserService.validateResetCode(code, body);
    }
    ;
};
exports.PassController = PassController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_pass_dto_1.ChangeLoggedUserPasswordDto, Object]),
    __metadata("design:returntype", void 0)
], PassController.prototype, "login", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PassController.prototype, "sendResetCode", null);
__decorate([
    (0, common_1.Patch)(":code"),
    __param(0, (0, common_1.Param)("code")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_pass_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], PassController.prototype, "deleteMe", null);
exports.PassController = PassController = __decorate([
    (0, common_1.Controller)("password"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], PassController);
;
//# sourceMappingURL=pass.controller.js.map