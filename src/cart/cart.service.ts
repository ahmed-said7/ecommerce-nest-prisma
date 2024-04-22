import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { addProductDto } from "./dto/add.prod.dto";
import { UserInterface } from "src/user/user.service";
import { updateProductQuantityDto } from "./dto/remove.prod.dto";
import { applyCouponDto } from "./dto/apply.coupon.dto";

@Injectable()
export class CartService {
    constructor(private prisma:PrismaService){};
    async addProduct(body:addProductDto,user:UserInterface){
        let cart=await this.prisma.cart
            .findFirst({ where : { userId : user.id }  });
        const product=await this.prisma.product
            .findUnique({ where : { id:body.productId } });
        
        if(! product ){
            throw new HttpException("product not found",400);
        };
        if( cart ){
            
            cart=await this.prisma.cart.update({ where : { id:cart.id } , data : {
                price: cart.price +  product.price,
                cartItems : {
                    upsert : {
                        // @ts-ignore
                        where : { color : body.color , productId : body.productId , cartId:cart.id },
                        create : {
                            productId : body.productId ,
                            price : product.price,
                            color:body.color,
                            quantity:1
                        },
                        update : {
                            quantity : {
                                increment : 1
                            }
                        }
                    }
                }
                }
                , include : { cartItems : true }
            });
        }else {
            cart=await this.prisma.cart.create({ data : { 
                userId: user.id,
                price: product.price ,
                cartItems : {
                    create: {
                        productId : body.productId ,
                        price : product.price,
                        color:body.color,
                        quantity:1
                    }
                }
            }, include : { cartItems:true } 
            })
            
        };
        return { cart };
    };
    async deleteItemFromCart(recordId:number,user:UserInterface){
        let cart=await this.prisma.cart
            .findFirst({ where : { userId : user.id } , include : { cartItems:true } });
        if(! cart ){
            throw new HttpException("cart not found",400);
        };
        try{
            cart=await this.prisma.cart.update({ 
                where : {id : cart.id },
                data : {
                    cartItems : {
                        delete : { id : recordId }
                    }
                },
                include : { cartItems : true }
            });
            return { cart };
        }catch(e){
            throw new HttpException("no product found in cart",400);
        };
    };
    async updateItemQuantity(recordId:number,body:updateProductQuantityDto,user:UserInterface){
        let cart=await this.prisma.cart
            .findFirst({ where : { userId : user.id } });
        if(! cart ){
            throw new HttpException("cart not found",400);
        };
        try{
            cart=await this.prisma.cart.update({ 
                where : {id : cart.id },
                data : {
                    cartItems : {
                        update : {
                            where : { id : recordId }
                            ,data : { quantity : body.quantity }
                        }
                    }
                },
                include : { cartItems : true }
            });
            return { cart };
        }catch(e){
            throw new HttpException("no product found in cart to update",400);
        };
    };
    async deleteLoggedUserCart(user:UserInterface){
        try{
            const cart = await this.prisma.cart.deleteMany({ where:{userId:user.id} });
            return { status : "deleted" };
        }catch(e){
            throw new HttpException("cart not found", 400);
        };
    };
    async getLoggedUserCart(user:UserInterface){
        let cart=await this.prisma.cart
            .findFirst({ where : { userId : user.id } });
        if(! cart ){
            throw new HttpException("cart not found",400);
        };
        return { cart};
    };
    async applyCoupon(body:applyCouponDto,user:UserInterface){
        const coupon=await this.prisma.coupon.findFirst({
            where: { name: body.name,couponExpiresIn: {gt : new Date() } }
        });
        if( ! coupon ){
            throw new HttpException( "coupon not found" , 400 );
        };
        let cart=await this.prisma.cart
            .findFirst({ where : { userId : user.id } });
        if(! cart ){
            throw new HttpException("cart not found",400);
        };
        const price=cart.price - ( coupon.discount / 100 )*cart.price;
        try{
            cart=await this.prisma.cart.update({ 
                where : {id : cart.id },
                data : {
                    priceAfterDiscount: price
                },
                include : { cartItems : true }
            });
            return { cart };
        }catch(e){
            throw new HttpException("cart not found",400);
        };
    };
};