import { QueryValidationDto } from "src/common/dto/query.dto";
export declare class ProductQueryDto extends QueryValidationDto {
    id: number | object;
    rating: number | object;
    price: number | object;
    discount: number | object;
    name: string;
    description: string;
    categoryId: number | object;
    brandId: number | object;
    ratingQuantity: number | object;
    ratingAverage: number | object;
    sold: number | object;
    quantity: number | object;
}
