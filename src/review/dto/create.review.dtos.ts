import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    comment:string;
    @IsNotEmpty()
    @IsNumber()
    @Max(5)
    @Min(1)
    rating:number;
    @IsNotEmpty()
    @IsInt()
    productId:number;
    @IsOptional()
    @IsInt()
    userId:number;
};