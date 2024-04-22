import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { QueryValidationDto } from "src/common/dto/query.dto";
import { validateQueryDateFunction, validateQueryFunction } from "src/common/global/validate.query";

export class CouponQueryDto extends QueryValidationDto {
    @IsOptional()
    @Transform( validateQueryFunction )
    id: number | object;
    @IsOptional()
    name: string;
    @IsOptional()
    @Transform( validateQueryFunction )
    discount: number | object;
    @IsOptional()
    @Transform( validateQueryDateFunction )
    couponExpiresIn:Date|object;
};