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
exports.CouponController = void 0;
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("./coupon.service");
const query_coupon_dto_1 = require("./dto/query.coupon.dto");
const create_coupon_dto_1 = require("./dto/create.coupon.dto");
const update_coupon_dto_1 = require("./dto/update.coupon.dto");
const authentication_guard_1 = require("../common/guard/authentication.guard");
const authorization_guard_1 = require("../common/guard/authorization.guard");
const user_service_1 = require("../user/user.service");
let CouponController = class CouponController {
    constructor(couponService) {
        this.couponService = couponService;
    }
    ;
    getAllCoupons(query) {
        return this.couponService.getAllCoupons(query);
    }
    ;
    createCoupon(body) {
        console.log(body);
        return this.couponService.createCoupon(body);
    }
    ;
    getCoupon(id) {
        return this.couponService.getCoupon(id);
    }
    ;
    deleteCoupon(id) {
        return this.couponService.deleteCoupon(id);
    }
    ;
    updateCoupon(id, body) {
        return this.couponService.updateCoupon(id, body);
    }
    ;
};
exports.CouponController = CouponController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_coupon_dto_1.CouponQueryDto]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "getAllCoupons", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coupon_dto_1.CreateCouponDto]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "createCoupon", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "getCoupon", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "deleteCoupon", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_coupon_dto_1.UpdateCouponDto]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "updateCoupon", null);
exports.CouponController = CouponController = __decorate([
    (0, common_1.Controller)("coupon"),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponController);
;
//# sourceMappingURL=coupon.controller.js.map