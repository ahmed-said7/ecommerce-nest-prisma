import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { NodemailerService } from "src/nodemailer/nodemailer.service";
import { CreateUserDto, LoginUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { ChangeLoggedUserPasswordDto, ChangePasswordDto } from "./dto/change.pass.dto";
export declare enum userType {
    user = "user",
    admin = "admin",
    manager = "manager"
}
export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    image: string;
    role: userType;
}
export declare class UserService {
    private prisma;
    private config;
    private nodemailer;
    constructor(prisma: PrismaService, config: ConfigService, nodemailer: NodemailerService);
    signup(body: CreateUserDto, res: Response): Promise<void>;
    createUser(body: CreateUserDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            image: string;
            role: import(".prisma/client").$Enums.UserType;
            passwordChangedAt: Date;
            passwordResetCode: string;
            passwordResetCodeExpiresIn: Date;
        };
    }>;
    login(body: LoginUserDto, res: Response): Promise<void>;
    updateUser(body: UpdateUserDto, id: number): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            image: string;
            role: import(".prisma/client").$Enums.UserType;
            passwordChangedAt: Date;
            passwordResetCode: string;
            passwordResetCodeExpiresIn: Date;
        };
    }>;
    deleteUser(id: number): Promise<{
        status: string;
    }>;
    getUser(id: number): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            image: string;
            role: import(".prisma/client").$Enums.UserType;
            passwordChangedAt: Date;
            passwordResetCode: string;
            passwordResetCodeExpiresIn: Date;
        };
    }>;
    changeLoggedUserPassword(body: ChangeLoggedUserPasswordDto, user: UserInterface): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            image: string;
            role: import(".prisma/client").$Enums.UserType;
            passwordChangedAt: Date;
            passwordResetCode: string;
            passwordResetCodeExpiresIn: Date;
        };
    }>;
    forgetPassword(email: string): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            image: string;
            role: import(".prisma/client").$Enums.UserType;
            passwordChangedAt: Date;
            passwordResetCode: string;
            passwordResetCodeExpiresIn: Date;
        };
        code: string;
    }>;
    validateResetCode(code: string, body: ChangePasswordDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            image: string;
            role: import(".prisma/client").$Enums.UserType;
            passwordChangedAt: Date;
            passwordResetCode: string;
            passwordResetCodeExpiresIn: Date;
        };
    }>;
    private createToken;
    private validateEmail;
    private comparePassword;
    private hashPassword;
}
