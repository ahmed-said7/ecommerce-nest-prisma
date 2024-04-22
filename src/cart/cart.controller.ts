import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { CartService } from "src/cart/cart.service";
import { User } from "src/common/decorator/current.user.decorator";
import { UserInterface } from "src/user/user.service";
import { addProductDto } from "src/cart/dto/add.prod.dto";
import { updateProductQuantityDto } from "./dto/remove.prod.dto";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";
import { userType } from "src/user/user.service";

@Controller("cart")
export class CartController {
    constructor(private cartService:CartService){};
    @Get()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.user,userType.manager,userType.admin])
    getCart( @User() user:UserInterface ){
        return this.cartService.getLoggedUserCart(user);
    };

    @Delete()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.user,userType.manager,userType.admin])
    deleteCart(@User() user:UserInterface){
        return this.cartService.deleteLoggedUserCart(user);
    };

    @Post()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.user,userType.manager,userType.admin])
    addProduct(@User() user:UserInterface,@Body() body:addProductDto ){
        return this.cartService.addProduct(body,user);
    };

    @Delete(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.user,userType.manager,userType.admin])
    deleteItem( @Param("id",ParseIntPipe) id:number,@User() user:UserInterface ){
        return this.cartService.deleteItemFromCart(id,user);
    };
    
    @Patch(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.user,userType.manager,userType.admin])
    updateQuantity( @Param("id",ParseIntPipe) id:number,@User() user:UserInterface,@Body() body:updateProductQuantityDto ){
        return this.cartService.updateItemQuantity(id,body,user);
    };
};