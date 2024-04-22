import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { StripeService } from "src/stripe/stripe.service";
import { UserInterface } from "src/user/user.service";
import { OrderQueryDto } from "./dto/query.order.dto";
import { ApiService } from "src/Api/api.service";

@Injectable()
export class OrderService {
    constructor(
        private api:ApiService<OrderQueryDto>,
        private config:ConfigService,
        private stripeService:StripeService,private prisma:PrismaService
    ){};
    async createCashOrder(user:UserInterface){
        const cart=await this.prisma.cart.findFirst({
            where:{userId:user.id},
            include:
            { cartItems : { select : { quantity:true , productId:true , price : true , color : true } } }
        });
        if(!cart){
            throw new HttpException("cart not found",400);
        };
        const order=await this.prisma.order.create({
            data:{
            userId:user.id,
            price: cart.priceAfterDiscount ? cart.priceAfterDiscount : cart.price ,
            method : "cash",
            cartItems : { create : cart.cartItems },
            tax:20
        }})
        await this.updateProducts(cart.id);
        return { order };
    };
    async getOrder(id:number){
        const order=await this.prisma.order.findFirst({
            where:{id},
            include:{cartItems:true,user:true}
        });
        if(!order){
            throw new HttpException("order not found",400);
        };
        return { order };
    };
    async deleteOrder(id:number , user:UserInterface){
        const {order}=await this.getOrder(id);
        if( user.role == "user" && user.id != order.userId ){
            throw new HttpException("you are not allowed to delete this order",400);
        };
        try{
            await this.prisma.order.delete({
                where:{id}
            });
            return { status : "deleted" };
        }catch(er){
            throw new HttpException("Error deleting order",400);
        };
    };
    async updateDeliveredOrder(id:number){
        try{
            const order=await this.prisma.order.update({
                where:{id},
                data : { deliveredAt : new Date() , delivered : true },
                include : { cartItems:true , user:true }
            });
            return { order };
        }catch(er){
            throw new HttpException("Error updating order",400);
        };
    };
    async updatePaidOrder(id:number){
        try{
            const order=await this.prisma.order.update({
                where:{id},
                data : { paidAt : new Date() , paid : true },
                include : { cartItems:true , user:true }
            });
            return { order };
        }catch(er){
            throw new HttpException("Error updating order",400);
        };
    };
    async checkoutSession(user:UserInterface,req:Request){
        const cart=await this.prisma.cart.findFirst({
            where:{userId:user.id},
            include:
            { cartItems : { select : { quantity:true , productId:true , price : true , color : true } } }
        });
        if(!cart){
            throw new HttpException("cart not found",400);
        };
        const session=await this.stripeService.stripe.checkout.sessions.create({
            line_items:[
                {
                    price_data:
                    {
                    currency:"egp" , unit_amount:cart.price*100,
                    product_data:{ name: user.name }
                    },
                    quantity:1,
                },
            ],
            mode:"payment",
            client_reference_id:user.email,
            success_url:`${req.protocol}://${req.get('host')}/success`,
            cancel_url:`${req.protocol}://${req.get('host')}/cancel`,
            customer_email: user.email
        });
        return { session };
    };
    async webhookSession(req:Request){
        const sig=req.headers["stripe-signature"];
        const secret=this.config.get<string>("webhook_key");
        const body=req.body;
        try{
            const event=await this.stripeService.stripe.webhooks.constructEvent(body,sig,secret);
            if( event.type === "checkout.session.completed" ){
                const cartId=parseInt(event.data.object.client_reference_id);
                const email=event.data.object.customer_email;
                this.createOnlineOrder(cartId,email);
            };
        }catch(er){
            throw new HttpException("Error stripe",400);
        }
    };
    private async createOnlineOrder(cartId:number,email:string){
        const user=await this.prisma.user.findFirst({where:{email}})
        if( !user ){
            throw new HttpException("user not found",400);
        };
        const cart=await this.prisma.cart.findFirst({
            where:{id:cartId},
            include:
            { cartItems : { select : { quantity:true , productId:true , price : true , color : true } } }
        });
        await this.prisma.order.create({
            data:{
            userId:user.id,
            price: cart.priceAfterDiscount ? cart.priceAfterDiscount : cart.price ,
            method : "online",
            cartItems : { create : cart.cartItems },
            tax:0
        }})
        await this.updateProducts(cartId);
    };
    private async updateProducts(cartId:number){
        const cart=await this.prisma.cart.findFirst({
            where:{id:cartId},
            include:
            { cartItems : { select : { quantity:true , productId:true  } } }
        });
        const promises=cart.cartItems.map((item)=>{
            this.prisma.product.update({where:{id:item.productId}
                ,data:{ 
                    quantity : {decrement:item.quantity},
                    sold:{increment:item.quantity}
                }})
        });
        await Promise.all(promises);
        await this.prisma.cart.delete({where:{id:cart.id}});
    };
    async getAllOrders(query:OrderQueryDto){
        const obj=this.api.filter(query).sort().select()
            .pagination()
            .include({cartItems:true,user:true}).obj;
        // @ts-ignore
        const orders=await this.prisma.order.findMany( obj );
        return { orders };
    };
};