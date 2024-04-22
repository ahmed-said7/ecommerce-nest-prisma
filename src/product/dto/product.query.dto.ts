import { Transform } from "class-transformer";
import {  IsOptional } from "class-validator";
import { QueryValidationDto } from "src/common/dto/query.dto";
import { validateQueryFunction } from "src/common/global/validate.query";

export class ProductQueryDto extends QueryValidationDto {
    @IsOptional()
    @Transform( validateQueryFunction )
    id: number | object;
    @IsOptional()
    @Transform( validateQueryFunction )
    rating: number|object;
    @IsOptional()
    @Transform( validateQueryFunction )
    price:number | object ;
    @IsOptional()
    @Transform( validateQueryFunction )
    discount:number | object ;
    @IsOptional()
    name:string;
    @IsOptional()
    description:string;
    @IsOptional()
    @Transform( validateQueryFunction )
    categoryId:number | object ;
    @IsOptional()
    @Transform( validateQueryFunction )
    brandId:number | object ;
    @IsOptional()
    @Transform( validateQueryFunction )
    ratingQuantity:number | object ;
    @IsOptional()
    @Transform( validateQueryFunction )
    ratingAverage:number | object ;
    @IsOptional()
    @Transform( validateQueryFunction )
    sold:number | object ;
    @IsOptional()
    @Transform( validateQueryFunction )
    quantity:number | object ;
};