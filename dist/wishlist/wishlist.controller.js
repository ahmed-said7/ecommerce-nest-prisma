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
exports.WishlistController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../common/decorator/current.user.decorator");
const wishlist_service_1 = require("./wishlist.service");
const authentication_guard_1 = require("../common/guard/authentication.guard");
let WishlistController = class WishlistController {
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    ;
    addProductToWishlist(id, user) {
        return this.wishlistService.addProductToWishlist(id, user);
    }
    ;
    deleteAddress(id, user) {
        return this.wishlistService.deleteProductFromWishlist(id, user);
    }
    ;
    getWishlist(user) {
        return this.wishlistService.getLoggedUserWishlist(user);
    }
    ;
};
exports.WishlistController = WishlistController;
__decorate([
    (0, common_1.Post)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "addProductToWishlist", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Query)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "deleteAddress", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "getWishlist", null);
exports.WishlistController = WishlistController = __decorate([
    (0, common_1.Controller)("wishlist"),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistController);
;
//# sourceMappingURL=wishlist.controller.js.map