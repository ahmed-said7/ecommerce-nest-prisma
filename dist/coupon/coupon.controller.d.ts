import { CouponService } from "./coupon.service";
import { CouponQueryDto } from "./dto/query.coupon.dto";
import { CreateCouponDto } from "./dto/create.coupon.dto";
import { UpdateCouponDto } from "./dto/update.coupon.dto";
export declare class CouponController {
    private couponService;
    constructor(couponService: CouponService);
    getAllCoupons(query: CouponQueryDto): Promise<{
        coupons: ({} & {
            id: number;
            name: string;
            couponExpiresIn: Date;
            discount: number;
        })[];
    }>;
    createCoupon(body: CreateCouponDto): Promise<{
        coupon: {
            id: number;
            name: string;
            couponExpiresIn: Date;
            discount: number;
        };
    }>;
    getCoupon(id: number): Promise<{
        coupon: {
            id: number;
            name: string;
            couponExpiresIn: Date;
            discount: number;
        };
    }>;
    deleteCoupon(id: number): Promise<{
        status: string;
    }>;
    updateCoupon(id: number, body: UpdateCouponDto): Promise<{
        coupon: {
            id: number;
            name: string;
            couponExpiresIn: Date;
            discount: number;
        };
    }>;
}
