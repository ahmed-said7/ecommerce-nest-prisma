import { CreateUserDto, LoginUserDto } from "../dto/create.user.dto";
import { Response } from "express";
import { UpdateUserDto } from "../dto/update.user.dto";
import { UserService } from "../user.service";
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    signup(body: CreateUserDto, res: Response): Promise<void>;
    login(body: LoginUserDto, res: Response): Promise<void>;
    updateUser(id: number, body: UpdateUserDto): Promise<{
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
}
