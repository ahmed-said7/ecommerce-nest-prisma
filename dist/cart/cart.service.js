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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    ;
    async addProduct(body, user) {
        let cart = await this.prisma.cart
            .findFirst({ where: { userId: user.id } });
        const product = await this.prisma.product
            .findUnique({ where: { id: body.productId } });
        if (!product) {
            throw new common_1.HttpException("product not found", 400);
        }
        ;
        if (cart) {
            cart = await this.prisma.cart.update({ where: { id: cart.id }, data: {
                    price: cart.price + product.price,
                    cartItems: {
                        upsert: {
                            where: { color: body.color, productId: body.productId, cartId: cart.id },
                            create: {
                                productId: body.productId,
                                price: product.price,
                                color: body.color,
                                quantity: 1
                            },
                            update: {
                                quantity: {
                                    increment: 1
                                }
                            }
                        }
                    }
                },
                include: { cartItems: true }
            });
        }
        else {
            cart = await this.prisma.cart.create({ data: {
                    userId: user.id,
                    price: product.price,
                    cartItems: {
                        create: {
                            productId: body.productId,
                            price: product.price,
                            color: body.color,
                            quantity: 1
                        }
                    }
                }, include: { cartItems: true }
            });
        }
        ;
        return { cart };
    }
    ;
    async deleteItemFromCart(recordId, user) {
        let cart = await this.prisma.cart
            .findFirst({ where: { userId: user.id }, include: { cartItems: true } });
        if (!cart) {
            throw new common_1.HttpException("cart not found", 400);
        }
        ;
        try {
            cart = await this.prisma.cart.update({
                where: { id: cart.id },
                data: {
                    cartItems: {
                        delete: { id: recordId }
                    }
                },
                include: { cartItems: true }
            });
            return { cart };
        }
        catch (e) {
            throw new common_1.HttpException("no product found in cart", 400);
        }
        ;
    }
    ;
    async updateItemQuantity(recordId, body, user) {
        let cart = await this.prisma.cart
            .findFirst({ where: { userId: user.id } });
        if (!cart) {
            throw new common_1.HttpException("cart not found", 400);
        }
        ;
        try {
            cart = await this.prisma.cart.update({
                where: { id: cart.id },
                data: {
                    cartItems: {
                        update: {
                            where: { id: recordId },
                            data: { quantity: body.quantity }
                        }
                    }
                },
                include: { cartItems: true }
            });
            return { cart };
        }
        catch (e) {
            throw new common_1.HttpException("no product found in cart to update", 400);
        }
        ;
    }
    ;
    async deleteLoggedUserCart(user) {
        try {
            const cart = await this.prisma.cart.deleteMany({ where: { userId: user.id } });
            return { status: "deleted" };
        }
        catch (e) {
            throw new common_1.HttpException("cart not found", 400);
        }
        ;
    }
    ;
    async getLoggedUserCart(user) {
        let cart = await this.prisma.cart
            .findFirst({ where: { userId: user.id } });
        if (!cart) {
            throw new common_1.HttpException("cart not found", 400);
        }
        ;
        return { cart };
    }
    ;
    async applyCoupon(body, user) {
        const coupon = await this.prisma.coupon.findFirst({
            where: { name: body.name, couponExpiresIn: { gt: new Date() } }
        });
        if (!coupon) {
            throw new common_1.HttpException("coupon not found", 400);
        }
        ;
        let cart = await this.prisma.cart
            .findFirst({ where: { userId: user.id } });
        if (!cart) {
            throw new common_1.HttpException("cart not found", 400);
        }
        ;
        const price = cart.price - (coupon.discount / 100) * cart.price;
        try {
            cart = await this.prisma.cart.update({
                where: { id: cart.id },
                data: {
                    priceAfterDiscount: price
                },
                include: { cartItems: true }
            });
            return { cart };
        }
        catch (e) {
            throw new common_1.HttpException("cart not found", 400);
        }
        ;
    }
    ;
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
;
//# sourceMappingURL=cart.service.js.map