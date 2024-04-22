import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { QueryValidationDto } from "src/common/dto/query.dto";
import { validateQueryFunction } from "src/common/global/validate.query";

export class CategoryQuery extends QueryValidationDto {
    @IsOptional()
    @Transform( validateQueryFunction )
    id: number | object;
    @IsOptional()
    name: string;
};