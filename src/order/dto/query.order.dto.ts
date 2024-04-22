import { OrderType } from "@prisma/client";
import { Transform } from "class-transformer";
import {  IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { QueryValidationDto } from "src/common/dto/query.dto";
import { validateQueryDateFunction, validateQueryFunction } from "src/common/global/validate.query";



export class OrderQueryDto extends QueryValidationDto {
    @IsOptional()
    @Transform( validateQueryFunction )
    id: number | object;
    @IsOptional()
    @Transform( validateQueryFunction )
    price:number|object;
    @IsOptional()
    @Transform( validateQueryFunction )
    userId:number|object;
    @IsOptional()
    @Transform( validateQueryDateFunction )
    deliveredAt:Date|object;
    @IsOptional()
    @Transform( validateQueryDateFunction )
    paidAt:Date|object;
    @IsOptional()
    @IsBoolean()
    delivered:boolean;
    @IsOptional()
    @IsBoolean()
    paid:boolean;
    @IsOptional()
    @IsEnum(OrderType)
    method:OrderType;
};