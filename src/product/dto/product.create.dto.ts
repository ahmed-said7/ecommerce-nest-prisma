import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";




export class CreateProductDto {
    @IsNotEmpty()
    @IsNumber()
    price:number;
    @IsOptional()
    @IsNumber()
    discount:number;
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    description:string;
    @IsNotEmpty()
    @IsNumber()
    categoryId:number;
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each:true})
    images:string[];
    @IsNotEmpty()
    @IsString()
    imageCover:string;
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each:true})
    colors:string[];
    @IsNotEmpty()
    @IsNumber()
    brandId:number;
    @IsNotEmpty()
    @IsNumber()
    ratingQuantity:number;
    @IsNotEmpty()
    @IsNumber()
    ratingAverage:number;
    @IsNotEmpty()
    @IsNumber()
    sold:number;
    @IsNotEmpty()
    @IsNumber()
    quantity:number;
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({},{each:true})
    subcategories:number[];
};