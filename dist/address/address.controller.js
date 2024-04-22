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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const address_dto_1 = require("./dto/address.dto");
const user_service_1 = require("../user/user.service");
const current_user_decorator_1 = require("../common/decorator/current.user.decorator");
const authentication_guard_1 = require("../common/guard/authentication.guard");
const authorization_guard_1 = require("../common/guard/authorization.guard");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    ;
    addAddresse(body, user) {
        return this.addressService.addAddress(body, user);
    }
    ;
    deleteAddress(id, user) {
        return this.addressService.deleteAddress(id, user);
    }
    ;
    updateAddress(id, user, body) {
        return this.addressService.updateAddress(body, id, user);
    }
    ;
    getUserAddresses(userId) {
        return this.addressService.getUserAddresses(userId);
    }
    ;
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_dto_1.CreateAddressDto, Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "addAddresse", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, common_1.Query)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "deleteAddress", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, address_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "getUserAddresses", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.Controller)("address"),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
;
//# sourceMappingURL=address.controller.js.map