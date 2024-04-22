import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";

import { UserInterface } from "src/user/user.service";
import { User } from "src/common/decorator/current.user.decorator";
import { WishlistService } from "./wishlist.service";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
@Controller("wishlist")
export class WishlistController {

    constructor(private wishlistService:WishlistService){};

    @Post(":id")
    @UseGuards(AuthenticationGuard)
    addProductToWishlist( @Param("id",ParseIntPipe) id:number,@User() user:UserInterface ){
        return this.wishlistService.addProductToWishlist(id,user);
    };

    @Delete(":id")
    @UseGuards(AuthenticationGuard)
    deleteAddress(@Query("id",ParseIntPipe) id:number,@User() user:UserInterface){
        return this.wishlistService.deleteProductFromWishlist(id,user);
    };

    @Get()
    @UseGuards(AuthenticationGuard)
    getWishlist(@User() user:UserInterface ){
        return this.wishlistService.getLoggedUserWishlist(user);
    };

};