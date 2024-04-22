import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { User } from "src/common/decorator/current.user.decorator";
import { UserInterface } from "src/user/user.service";
import { Request } from "express";
import { OrderQueryDto } from "./dto/query.order.dto";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";
import { userType } from "src/user/user.service";



@Controller("order")
export class OrderController {
    constructor(private orderService: OrderService){};
    @Post("cash")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    orderCashCreate( @User() user:UserInterface ){
        return this.orderService.createCashOrder(user);
    };
    @Get("session")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    getSession(@User() user:UserInterface,@Req() req:Request ){
        return this.orderService.checkoutSession(user,req);
    };
    @Delete(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    delOrder(@User() user:UserInterface,@Param("id",ParseIntPipe) id:number ){
        return this.orderService.deleteOrder(id,user);
    };
    @Get(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    getOrder(@Param("id",ParseIntPipe) id:number){
        return this.orderService.getOrder(id);
    };
    @Get()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    getAll(@Query() query:OrderQueryDto){
        return this.orderService.getAllOrders(query);
    };
    @Patch("deliver/:id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    updateDelivered(@Param("id",ParseIntPipe) id:number){
        return this.orderService.updateDeliveredOrder(id);
    };
    @Patch("paid/:id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    updatePaid(@Param("id",ParseIntPipe) id:number){
        return this.orderService.updatePaidOrder(id);
    };
    @Post()
    stripePostReq(@Req() req:Request){
        return this.orderService.webhookSession(req);
    };
};