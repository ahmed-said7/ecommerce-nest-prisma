import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto, UpdateAddressDto } from "./dto/address.dto";
import { UserInterface, userType } from "src/user/user.service";
import { User } from "src/common/decorator/current.user.decorator";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";



@Controller("address")
export class AddressController {
    constructor(private addressService:AddressService){};
    @Post()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    addAddresse( @Body() body: CreateAddressDto,@User() user:UserInterface ){
        return this.addressService.addAddress(body,user);
    };

    @Delete(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    deleteAddress(@Query("id",ParseIntPipe) id:number,@User() user:UserInterface){
        return this.addressService.deleteAddress(id,user);
    };
    @Patch(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    updateAddress(@Param("id",ParseIntPipe) id:number,@User() user:UserInterface,@Body() body: UpdateAddressDto ){
        return this.addressService.updateAddress(body,id,user);
    };
    @Get(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    getUserAddresses( @Param("id",ParseIntPipe) userId:number ){
        return this.addressService.getUserAddresses(userId);
    };
};