import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateCouponDto {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsDate( )
    couponExpiresIn:Date;
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    discount : number;
};