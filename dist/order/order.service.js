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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const stripe_service_1 = require("../stripe/stripe.service");
const api_service_1 = require("../Api/api.service");
let OrderService = class OrderService {
    constructor(api, config, stripeService, prisma) {
        this.api = api;
        this.config = config;
        this.stripeService = stripeService;
        this.prisma = prisma;
    }
    ;
    async createCashOrder(user) {
        const cart = await this.prisma.cart.findFirst({
            where: { userId: user.id },
            include: { cartItems: { select: { quantity: true, productId: true, price: true, color: true } } }
        });
        if (!cart) {
            throw new common_1.HttpException("cart not found", 400);
        }
        ;
        const order = await this.prisma.order.create({
            data: {
                userId: user.id,
                price: cart.priceAfterDiscount ? cart.priceAfterDiscount : cart.price,
                method: "cash",
                cartItems: { create: cart.cartItems },
                tax: 20
            }
        });
        await this.updateProducts(cart.id);
        return { order };
    }
    ;
    async getOrder(id) {
        const order = await this.prisma.order.findFirst({
            where: { id },
            include: { cartItems: true, user: true }
        });
        if (!order) {
            throw new common_1.HttpException("order not found", 400);
        }
        ;
        return { order };
    }
    ;
    async deleteOrder(id, user) {
        const { order } = await this.getOrder(id);
        if (user.role == "user" && user.id != order.userId) {
            throw new common_1.HttpException("you are not allowed to delete this order", 400);
        }
        ;
        try {
            await this.prisma.order.delete({
                where: { id }
            });
            return { status: "deleted" };
        }
        catch (er) {
            throw new common_1.HttpException("Error deleting order", 400);
        }
        ;
    }
    ;
    async updateDeliveredOrder(id) {
        try {
            const order = await this.prisma.order.update({
                where: { id },
                data: { deliveredAt: new Date(), delivered: true },
                include: { cartItems: true, user: true }
            });
            return { order };
        }
        catch (er) {
            throw new common_1.HttpException("Error updating order", 400);
        }
        ;
    }
    ;
    async updatePaidOrder(id) {
        try {
            const order = await this.prisma.order.update({
                where: { id },
                data: { paidAt: new Date(), paid: true },
                include: { cartItems: true, user: true }
            });
            return { order };
        }
        catch (er) {
            throw new common_1.HttpException("Error updating order", 400);
        }
        ;
    }
    ;
    async checkoutSession(user, req) {
        const cart = await this.prisma.cart.findFirst({
            where: { userId: user.id },
            include: { cartItems: { select: { quantity: true, productId: true, price: true, color: true } } }
        });
        if (!cart) {
            throw new common_1.HttpException("cart not found", 400);
        }
        ;
        const session = await this.stripeService.stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "egp", unit_amount: cart.price * 100,
                        product_data: { name: user.name }
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            client_reference_id: user.email,
            success_url: `${req.protocol}://${req.get('host')}/success`,
            cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
            customer_email: user.email
        });
        return { session };
    }
    ;
    async webhookSession(req) {
        const sig = req.headers["stripe-signature"];
        const secret = this.config.get("webhook_key");
        const body = req.body;
        try {
            const event = await this.stripeService.stripe.webhooks.constructEvent(body, sig, secret);
            if (event.type === "checkout.session.completed") {
                const cartId = parseInt(event.data.object.client_reference_id);
                const email = event.data.object.customer_email;
                this.createOnlineOrder(cartId, email);
            }
            ;
        }
        catch (er) {
            throw new common_1.HttpException("Error stripe", 400);
        }
    }
    ;
    async createOnlineOrder(cartId, email) {
        const user = await this.prisma.user.findFirst({ where: { email } });
        if (!user) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        const cart = await this.prisma.cart.findFirst({
            where: { id: cartId },
            include: { cartItems: { select: { quantity: true, productId: true, price: true, color: true } } }
        });
        await this.prisma.order.create({
            data: {
                userId: user.id,
                price: cart.priceAfterDiscount ? cart.priceAfterDiscount : cart.price,
                method: "online",
                cartItems: { create: cart.cartItems },
                tax: 0
            }
        });
        await this.updateProducts(cartId);
    }
    ;
    async updateProducts(cartId) {
        const cart = await this.prisma.cart.findFirst({
            where: { id: cartId },
            include: { cartItems: { select: { quantity: true, productId: true } } }
        });
        const promises = cart.cartItems.map((item) => {
            this.prisma.product.update({ where: { id: item.productId },
                data: {
                    quantity: { decrement: item.quantity },
                    sold: { increment: item.quantity }
                } });
        });
        await Promise.all(promises);
        await this.prisma.cart.delete({ where: { id: cart.id } });
    }
    ;
    async getAllOrders(query) {
        const obj = this.api.filter(query).sort().select()
            .pagination()
            .include({ cartItems: true, user: true }).obj;
        const orders = await this.prisma.order.findMany(obj);
        return { orders };
    }
    ;
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.ApiService,
        config_1.ConfigService,
        stripe_service_1.StripeService, prisma_service_1.PrismaService])
], OrderService);
;
//# sourceMappingURL=order.service.js.map