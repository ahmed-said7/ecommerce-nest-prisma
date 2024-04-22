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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const current_user_decorator_1 = require("../common/decorator/current.user.decorator");
const query_order_dto_1 = require("./dto/query.order.dto");
const authentication_guard_1 = require("../common/guard/authentication.guard");
const authorization_guard_1 = require("../common/guard/authorization.guard");
const user_service_1 = require("../user/user.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    ;
    orderCashCreate(user) {
        return this.orderService.createCashOrder(user);
    }
    ;
    getSession(user, req) {
        return this.orderService.checkoutSession(user, req);
    }
    ;
    delOrder(user, id) {
        return this.orderService.deleteOrder(id, user);
    }
    ;
    getOrder(id) {
        return this.orderService.getOrder(id);
    }
    ;
    getAll(query) {
        return this.orderService.getAllOrders(query);
    }
    ;
    updateDelivered(id) {
        return this.orderService.updateDeliveredOrder(id);
    }
    ;
    updatePaid(id) {
        return this.orderService.updatePaidOrder(id);
    }
    ;
    stripePostReq(req) {
        return this.orderService.webhookSession(req);
    }
    ;
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)("cash"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, current_user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "orderCashCreate", null);
__decorate([
    (0, common_1.Get)("session"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, current_user_decorator_1.User)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getSession", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, current_user_decorator_1.User)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "delOrder", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin, user_service_1.userType.user]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_order_dto_1.OrderQueryDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)("deliver/:id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateDelivered", null);
__decorate([
    (0, common_1.Patch)("paid/:id"),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, common_1.SetMetadata)("roles", [user_service_1.userType.manager, user_service_1.userType.admin]),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updatePaid", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "stripePostReq", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)("order"),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
;
//# sourceMappingURL=order.controller.js.map