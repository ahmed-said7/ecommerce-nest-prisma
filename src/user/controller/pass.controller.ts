import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { User } from "src/common/decorator/current.user.decorator";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { ChangeLoggedUserPasswordDto, ChangePasswordDto } from "../dto/change.pass.dto";
import { UserInterface, UserService } from "../user.service";


@Controller("password")
export class PassController {
    constructor(private UserService:UserService){};
    @Post()
    @UseGuards(AuthenticationGuard)
    login( @Body() body : ChangeLoggedUserPasswordDto ,@User() user:UserInterface ){
        return this.UserService.changeLoggedUserPassword(body,user);
    };
    @Patch()
    sendResetCode(@Body("email") email:string){
        return this.UserService.forgetPassword(email);
    };
    @Patch(":code")
    deleteMe( @Param("code") code:string , @Body() body : ChangePasswordDto  ){
        return this.UserService.validateResetCode(code,body);
    };
};