import { PrismaService } from "src/prisma/prisma.service";
import { addProductDto } from "./dto/add.prod.dto";
import { UserInterface } from "src/user/user.service";
import { updateProductQuantityDto } from "./dto/remove.prod.dto";
import { applyCouponDto } from "./dto/apply.coupon.dto";
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addProduct(body: addProductDto, user: UserInterface): Promise<{
        cart: {
            id: number;
            price: number;
            priceAfterDiscount: number;
            userId: number;
        };
    }>;
    deleteItemFromCart(recordId: number, user: UserInterface): Promise<{
        cart: {
            cartItems: {
                id: number;
                cartId: number;
                productId: number;
                price: number;
                color: string;
                quantity: number;
            }[];
        } & {
            id: number;
            price: number;
            priceAfterDiscount: number;
            userId: number;
        };
    }>;
    updateItemQuantity(recordId: number, body: updateProductQuantityDto, user: UserInterface): Promise<{
        cart: {
            id: number;
            price: number;
            priceAfterDiscount: number;
            userId: number;
        };
    }>;
    deleteLoggedUserCart(user: UserInterface): Promise<{
        status: string;
    }>;
    getLoggedUserCart(user: UserInterface): Promise<{
        cart: {
            id: number;
            price: number;
            priceAfterDiscount: number;
            userId: number;
        };
    }>;
    applyCoupon(body: applyCouponDto, user: UserInterface): Promise<{
        cart: {
            id: number;
            price: number;
            priceAfterDiscount: number;
            userId: number;
        };
    }>;
}
