import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateUserDto } from "../dto/update.user.dto";
import { User } from "src/common/decorator/current.user.decorator";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { ResizeSingleFileInterceptor } from "src/common/interceptor/file.interceptor";
import { UserInterface, UserService, userType } from "../user.service";



@Controller("user")
export class UserController {
    constructor(private UserService:UserService){};
    @Patch()
    @UseGuards(AuthenticationGuard)
    @UseInterceptors(FileInterceptor('image'),ResizeSingleFileInterceptor)
    updateMe(@User() user:UserInterface , @Body() body:UpdateUserDto){
        return this.UserService.updateUser(body,user.id);
    };
    @Delete()
    @UseGuards(AuthenticationGuard)
    deleteMe( @User() user:UserInterface ){
        return this.UserService.deleteUser(user.id);
    };
    @Get()
    @UseGuards(AuthenticationGuard)
    getUser(@User() user:UserInterface){
        return user;
    };
};