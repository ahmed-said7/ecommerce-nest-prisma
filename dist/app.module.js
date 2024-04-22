"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const category_module_1 = require("./category/category.module");
const sub_module_1 = require("./subcategory/sub.module");
const brand_module_1 = require("./brand/brand.module");
const product_module_1 = require("./product/product.module");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const review_module_1 = require("./review/review.module");
const coupon_module_1 = require("./coupon/coupon.module");
const cart_module_1 = require("./cart/cart.module");
const address_module_1 = require("./address/address.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const order_module_1 = require("./order/order.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
            category_module_1.CategoryModule, sub_module_1.SubcatModule, coupon_module_1.CouponModule,
            brand_module_1.BrandModule, product_module_1.ProductModule, user_module_1.UserModule,
            prisma_module_1.PrismaModule, review_module_1.ReviewModule, brand_module_1.BrandModule, cart_module_1.CartModule,
            address_module_1.AddressModule, wishlist_module_1.WishlistModule, order_module_1.OrderModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map