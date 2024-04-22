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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const current_user_decorator_1 = require("../common/decorator/current.user.decorator");
const add_prod_dto_1 = require("./dto/add.prod.dto");
const remove_prod_dto_1 = require("./dto/remove.prod.dto");
const authentication_guard_1 = require("../common/guard/authentication.guard");
const authorization_guard_1 = require("../common/guard/authorization.guard");
const user_service_1 = require("../user/user.service");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    ;
    getCart(user) {
        return this.cartService.getLoggedUserCart(user);
    }
    ;
    deleteCart(user) {
        return this.cartService.deleteLoggedUserCart(user);
    }
    ;
    addProduct(user, body) {
        return this.cartService.addProduct(body, user);
    }
    ;
    deleteItem(id, user) {
        return this.cartService.deleteItemFromCart(id, user);
    }
    ;
    updateQuantity(id, user, body) {
        return this.cartService.updateItemQuantity(id, body, user);
    }
    ;
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.user, user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.user, user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "deleteCart", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.user, user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, current_user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_prod_dto_1.addProductDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.user, user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.user, user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, remove_prod_dto_1.updateProductQuantityDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateQuantity", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)("cart"),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
;
//# sourceMappingURL=cart.controller.js.map