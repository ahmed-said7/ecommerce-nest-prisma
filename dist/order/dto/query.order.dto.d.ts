import { OrderType } from "@prisma/client";
import { QueryValidationDto } from "src/common/dto/query.dto";
export declare class OrderQueryDto extends QueryValidationDto {
    id: number | object;
    price: number | object;
    userId: number | object;
    deliveredAt: Date | object;
    paidAt: Date | object;
    delivered: boolean;
    paid: boolean;
    method: OrderType;
}
