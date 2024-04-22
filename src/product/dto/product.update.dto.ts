import { Type } from "class-transformer";
import { 
    ArrayNotEmpty, IsArray, IsNotEmpty,
    IsNumber, IsOptional, IsString, 
    ValidateNested
} from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsNumber()
    price:number;
    @IsOptional()
    @IsNumber()
    discount:number;
    @IsOptional()
    @IsString()
    name:string;
    @IsOptional()
    @IsString()
    description:string;
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each:true})
    images:string[];
    @IsOptional()
    @IsString()
    imageCover:string;
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each:true})
    colors:string[];
    @IsOptional()
    @IsNumber()
    ratingQuantity:number;
    @IsOptional()
    @IsNumber()
    ratingAverage:number;
    @IsOptional()
    @IsNumber()
    sold:number;
    @IsOptional()
    @IsNumber()
    quantity:number;
    @IsOptional()
    @IsNumber()
    categoryId:number;
    @IsOptional()
    @IsNumber()
    brandId:number;
};



export class UpdateRelationsDto {
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({},{each:true})
    subcategories:number[];
};
