import { QueryValidationDto } from "src/common/dto/query.dto";
export declare class CouponQueryDto extends QueryValidationDto {
    id: number | object;
    name: string;
    discount: number | object;
    couponExpiresIn: Date | object;
}
