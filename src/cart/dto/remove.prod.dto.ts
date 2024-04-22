import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class updateProductQuantityDto {
    @IsNotEmpty()
    @IsNumber()
    quantity:number
};