import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class addProductDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number;
    @IsNotEmpty()
    @IsString()
    color:string;
};