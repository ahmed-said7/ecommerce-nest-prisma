import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { QueryValidationDto } from "src/common/dto/query.dto";
import { validateQueryFunction } from "src/common/global/validate.query";

export class ReviewQueryDto extends QueryValidationDto {
    @IsOptional()
    @Transform( validateQueryFunction )
    id: number | object;
    @IsOptional()
    @Transform( validateQueryFunction )
    rating: number | object;
    @IsOptional()
    comment: string;
    @IsOptional()
    @Transform( validateQueryFunction )
    userId: number | object;
    @IsOptional()
    @Transform( validateQueryFunction )
    productId: number | object;
};