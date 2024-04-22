import { UpdateUserDto } from "../dto/update.user.dto";
import { UserInterface, UserService } from "../user.service";
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    updateMe(user: UserInterface, body: UpdateUserDto): Promise<{
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
    deleteMe(user: UserInterface): Promise<{
        status: string;
    }>;
    getUser(user: UserInterface): UserInterface;
}
