import { IsNotEmpty, IsString } from "class-validator";



export class applyCouponDto {
    @IsNotEmpty()
    @IsString()
    name: string;
};