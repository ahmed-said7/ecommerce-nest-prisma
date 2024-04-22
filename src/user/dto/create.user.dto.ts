import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { userType } from "../user.service";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    image:string;
    @IsOptional()
    @IsEnum(userType)
    role:userType;
};

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @IsString()
    password:string;
};