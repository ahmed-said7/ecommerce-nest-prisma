import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { SubcatService } from "./sub.service";
import { CreateSubcatDto } from "./dto/create.sub.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResizeSingleFileInterceptor } from "src/common/interceptor/file.interceptor";
import { SubcatQueryDto } from "./dto/query.dto";
import { UpdateSubcatDto } from "./dto/update.dto";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";
import { userType } from "src/user/user.service";


@Controller("subcat")
export class SubcatController {
    constructor(private SubService:SubcatService){};
    @Get()
    getAllSub(@Query() query:SubcatQueryDto ){
        return this.SubService.getAllSubcategories(query);
    };
    @Get(":id")
    getSub(@Param("id",ParseIntPipe) id:number){
        return this.SubService.getSubcat(id);
    };
    @Post()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    @UseInterceptors(FileInterceptor("image"),ResizeSingleFileInterceptor)
    createSub(@Body() body:CreateSubcatDto){
        return this.SubService.createSubcat(body);
    };
    @Patch(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    @UseInterceptors(FileInterceptor("image"),ResizeSingleFileInterceptor)
    updateSub(@Body() body:UpdateSubcatDto,@Param("id",ParseIntPipe) id:number){
        return this.SubService.updateSubcategories(id,body);
    };
    @Delete(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin])
    deleteSub(@Param("id",ParseIntPipe) id:number){
        return this.SubService.deleteSubcat(id);
    };
};