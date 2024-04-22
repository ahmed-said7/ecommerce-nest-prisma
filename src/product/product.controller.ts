import { Body, Controller,  Delete,  Get,  Param,  ParseIntPipe,  Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { fieldsInterceptor } from "src/common/interceptor/file.field.interceptor";
import { ProductService } from "./product.service";
import { ProductQueryDto } from "./dto/product.query.dto";
import { UpdateProductDto, UpdateRelationsDto } from "./dto/product.update.dto";
import { CreateProductDto } from "./dto/product.create.dto";
import { ResizeProductFilesInterceptor } from "src/common/interceptor/product.interceptor";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";
import { userType } from "src/user/user.service";

@Controller("product")
export class ProductController {
    constructor(private productService:ProductService){}
    @Post()
    
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    @UseInterceptors(fieldsInterceptor("images","imageCover"),ResizeProductFilesInterceptor)
    createProduct( @Body() body: CreateProductDto ){
        return this.productService.createProd(body);
    };
    @Patch("sub/:id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    updateSubcatProduct( @Param("id",ParseIntPipe) id:number , @Body() body:UpdateRelationsDto ){
        return this.productService.updateProductSubcategories(id,body);
    };
    @Patch(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    @UseInterceptors(fieldsInterceptor("images","imageCover"),ResizeProductFilesInterceptor)
    updateProduct( @Param("id",ParseIntPipe) id:number,@Body() body:UpdateProductDto ){
        return this.productService.updateProd(id,body);
    };
    @Get()
    getProducts(@Query() query:ProductQueryDto){
        return this.productService.getAllprods(query);
    };
    @Delete(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    deleteProduct( @Param("id",ParseIntPipe) id:number  ){
        return this.productService.deleteProduct(id);
    };
    @Get(":id")
    getProduct( @Param("id",ParseIntPipe) id:number ){
        return this.productService.getProduct(id);
    };
};