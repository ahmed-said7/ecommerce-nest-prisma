import { ChangeLoggedUserPasswordDto, ChangePasswordDto } from "../dto/change.pass.dto";
import { UserInterface, UserService } from "../user.service";
export declare class PassController {
    private UserService;
    constructor(UserService: UserService);
    login(body: ChangeLoggedUserPasswordDto, user: UserInterface): Promise<{
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
    sendResetCode(email: string): Promise<{
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
    deleteMe(code: string, body: ChangePasswordDto): Promise<{
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
