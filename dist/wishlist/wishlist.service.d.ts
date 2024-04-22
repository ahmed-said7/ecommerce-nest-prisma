import { PrismaService } from "src/prisma/prisma.service";
import { UserInterface } from "src/user/user.service";
export declare class WishlistService {
    private prisma;
    constructor(prisma: PrismaService);
    addProductToWishlist(productId: number, user: UserInterface): Promise<{
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
    deleteProductFromWishlist(productId: number, user: UserInterface): Promise<{
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
    getLoggedUserWishlist(user: UserInterface): Promise<{
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
    private validateProduct;
}
