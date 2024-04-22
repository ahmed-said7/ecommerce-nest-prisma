import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResizeSingleFileInterceptor } from "src/common/interceptor/file.interceptor";
import { UpdateBrandDto } from "./dto/brand.update.dto";
import { CreateBrandDto } from "./dto/brand.create.dto";
import { BrandQueryDto } from "./dto/brand.query.dto";
import { BrandService } from "./brand.service";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";
import { userType } from "src/user/user.service";

@Controller("brand")
export class BrandController {
    constructor(private brandService:BrandService){};
    @Get()
    getAllBrands( @Query() query : BrandQueryDto ){
        return this.brandService.getAllBrands(query);
    };

    @Post()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    @UseInterceptors( FileInterceptor("image") , ResizeSingleFileInterceptor )
    createBrand(@Body() body:CreateBrandDto){
        console.log(body);
        return this.brandService.createBrand(body);
    };
    @Get(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.user,userType.manager,userType.admin])
    getBrand(@Param("id",ParseIntPipe) id:number ){
        return this.brandService.getBrand(id);
    };
    @Delete(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    deleteBrand( @Param("id",ParseIntPipe) id:number ){
        return this.brandService.deleteBrand(id);
    };
    @Patch(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    @UseInterceptors( FileInterceptor("image") , ResizeSingleFileInterceptor )
    updateBrand(@Param("id",ParseIntPipe) id:number,@Body() body:UpdateBrandDto ){
        return this.brandService.updateBrand(id,body);
    };
};