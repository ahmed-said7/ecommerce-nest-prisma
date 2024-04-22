import { CartService } from "src/cart/cart.service";
import { UserInterface } from "src/user/user.service";
import { addProductDto } from "src/cart/dto/add.prod.dto";
import { updateProductQuantityDto } from "./dto/remove.prod.dto";
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart(user: UserInterface): Promise<{
        cart: {
            id: number;
            price: number;
            priceAfterDiscount: number;
            userId: number;
        };
    }>;
    deleteCart(user: UserInterface): Promise<{
        status: string;
    }>;
    addProduct(user: UserInterface, body: addProductDto): Promise<{
        cart: {
            id: number;
            price: number;
            priceAfterDiscount: number;
            userId: number;
        };
    }>;
    deleteItem(id: number, user: UserInterface): Promise<{
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
    updateQuantity(id: number, user: UserInterface, body: updateProductQuantityDto): Promise<{
        cart: {
            id: number;
            price: number;
            priceAfterDiscount: number;
            userId: number;
        };
    }>;
}
