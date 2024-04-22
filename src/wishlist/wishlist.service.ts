import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserInterface } from "src/user/user.service";



@Injectable()
export class WishlistService {
    constructor(private prisma: PrismaService){};
    async addProductToWishlist(productId:number,user:UserInterface){
        await this.validateProduct(productId);
        try{
            const userUpdated=await this.prisma.user.update({
                where:{id:user.id},
                data: {
                    wishlist:{connect:{id:productId}}
                },
                select:{wishlist:true}
            });
            return { user:userUpdated };
        }catch(e){
            throw new HttpException("adding product to wishlist failed",400);
        };
    };
    async deleteProductFromWishlist(productId:number,user:UserInterface){
        await this.validateProduct(productId);
        try{
            const userUpdated=await this.prisma.user.update({
                where:{id:user.id},
                data: {
                    wishlist:{disconnect:{id:productId}}
                },
                select:{wishlist:true}
            });
            return { user:userUpdated };
        }catch(e){
            throw new HttpException("adding product to wishlist failed",400);
        };
    };
    async getLoggedUserWishlist(user:UserInterface){
        const userUpdated=await this.prisma.user.findFirst({
            where:{id:user.id},
            select:{wishlist:true}
        });
        return { user:userUpdated };
    };
    private async validateProduct(id:number){
        const product=await this.prisma.product.findFirst({where:{id}});
        if(!product) throw new HttpException("product not found",404);
    };
};