import { QueryValidationDto } from "src/common/dto/query.dto";
export declare class ReviewQueryDto extends QueryValidationDto {
    id: number | object;
    rating: number | object;
    comment: string;
    userId: number | object;
    productId: number | object;
}
