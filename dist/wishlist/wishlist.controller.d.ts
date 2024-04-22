import { UserInterface } from "src/user/user.service";
import { WishlistService } from "./wishlist.service";
export declare class WishlistController {
    private wishlistService;
    constructor(wishlistService: WishlistService);
    addProductToWishlist(id: number, user: UserInterface): Promise<{
        user: {
            wishlist: {
                id: number;
                price: number;
                discount: number;
                name: string;
                description: string;
                categoryId: number;
                images: string[];
                imageCover: string;
                colors: string[];
                brandId: number;
                ratingQuantity: number;
                ratingAverage: number;
                sold: number;
                quantity: number;
            }[];
        };
    }>;
    deleteAddress(id: number, user: UserInterface): Promise<{
        user: {
            wishlist: {
                id: number;
                price: number;
                discount: number;
                name: string;
                description: string;
                categoryId: number;
                images: string[];
                imageCover: string;
                colors: string[];
                brandId: number;
                ratingQuantity: number;
                ratingAverage: number;
                sold: number;
                quantity: number;
            }[];
        };
    }>;
    getWishlist(user: UserInterface): Promise<{
        user: {
            wishlist: {
                id: number;
                price: number;
                discount: number;
                name: string;
                description: string;
                categoryId: number;
                images: string[];
                imageCover: string;
                colors: string[];
                brandId: number;
                ratingQuantity: number;
                ratingAverage: number;
                sold: number;
                quantity: number;
            }[];
        };
    }>;
}
