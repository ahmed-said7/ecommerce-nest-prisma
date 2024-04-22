import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { CategoryQuery } from "./dto/query.dto";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create.category";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResizeSingleFileInterceptor } from "src/common/interceptor/file.interceptor";
import { UpdateCategoryDto } from "./dto/update.category.dto";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";
import { userType } from "src/user/user.service";

@Controller("category")
export class CategoryController {
    constructor(private catService:CategoryService){};
    @Get()
    getAllCats( @Query() query : CategoryQuery ){
        return this.catService.getAllCategories(query);
    };

    @Post()
    @UseInterceptors( FileInterceptor("image") , ResizeSingleFileInterceptor )
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    createCat(@Body() body:CreateCategoryDto){
        console.log(body);
        return this.catService.createCat(body);
    };
    @Get(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    getCat(@Param("id",ParseIntPipe) id:number ){
        return this.catService.getCat(id);
    };
    @Delete(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    deleteCat( @Param("id",ParseIntPipe) id:number ){
        return this.catService.deleteCat(id);
    };
    @Patch(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    @UseInterceptors( FileInterceptor("image") , ResizeSingleFileInterceptor )
    updateCat(@Param("id",ParseIntPipe) id:number,@Body() body:UpdateCategoryDto ){
        return this.catService.updateCat(id,body);
    };
};