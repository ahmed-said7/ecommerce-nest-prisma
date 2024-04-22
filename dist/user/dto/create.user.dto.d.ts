import { userType } from "../user.service";
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    image: string;
    role: userType;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
