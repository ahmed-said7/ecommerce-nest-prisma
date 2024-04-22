import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "../dto/create.user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { UpdateUserDto } from "../dto/update.user.dto";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";
import { ResizeSingleFileInterceptor } from "src/common/interceptor/file.interceptor";
import { UserService, userType } from "../user.service";


@Controller("auth")
export class AuthController {
    constructor(private userService:UserService){};
    @Post("signup")
    // @UseInterceptors(FileInterceptor('image'),ResizeSingleFileInterceptor)
    signup( @Body() body : CreateUserDto ,@Res() res:Response ){
        return this.userService.signup(body,res);
    };
    @Post("login")
    login( @Body() body : LoginUserDto ,@Res() res:Response ){
        return this.userService.login(body,res);
    };
    @Patch(":id")
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @UseInterceptors(FileInterceptor('image'),ResizeSingleFileInterceptor)
    updateUser(@Param("id",ParseIntPipe) id:number, @Body() body:UpdateUserDto){
        return this.userService.updateUser(body,id);
    };
    @Delete(":id")
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    deleteUser(@Param("id",ParseIntPipe) id:number){
        return this.userService.deleteUser(id);
    };
    @Get(":id")
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    getUser(@Param("id",ParseIntPipe) id:number){
        return this.userService.getUser(id);
    };
};