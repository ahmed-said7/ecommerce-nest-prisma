import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { CouponQueryDto } from "./dto/query.coupon.dto";
import { CreateCouponDto } from "./dto/create.coupon.dto";
import { UpdateCouponDto } from "./dto/update.coupon.dto";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";
import { userType } from "src/user/user.service";



@Controller("coupon")
export class CouponController {
    constructor(private couponService:CouponService){};
    @Get()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    getAllCoupons( @Query() query : CouponQueryDto ){
        return this.couponService.getAllCoupons(query);
    };

    @Post()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    createCoupon(@Body() body:CreateCouponDto){
        console.log(body);
        return this.couponService.createCoupon(body);
    };
    @Get(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    getCoupon(@Param("id",ParseIntPipe) id:number ){
        return this.couponService.getCoupon(id);
    };
    @Delete(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    deleteCoupon( @Param("id",ParseIntPipe) id:number ){
        return this.couponService.deleteCoupon(id);
    };
    @Patch(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    updateCoupon(@Param("id",ParseIntPipe) id:number,@Body() body:UpdateCouponDto ){
        return this.couponService.updateCoupon(id,body);
    };
};