import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryValidationDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value) )
    @IsNumber()
    page?:number;
    @IsOptional()
    @Transform(({ value }) => parseInt(value) )
    @IsNumber()
    limit?:number;
    @IsOptional()
    @IsString()
    sort?:string;
    @IsOptional()
    @IsString()
    select?:string;
};