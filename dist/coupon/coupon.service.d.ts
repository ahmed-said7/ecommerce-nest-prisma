import { PrismaService } from "src/prisma/prisma.service";
import { ApiService } from "src/Api/api.service";
import { CreateCouponDto } from "./dto/create.coupon.dto";
import { UpdateCouponDto } from "./dto/update.coupon.dto";
import { CouponQueryDto } from "./dto/query.coupon.dto";
export declare class CouponService {
    private prisma;
    private api;
    constructor(prisma: PrismaService, api: ApiService<CouponQueryDto>);
    private validateName;
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
    getAllCoupons(query: CouponQueryDto): Promise<{
        coupons: ({} & {
            id: number;
            name: string;
            couponExpiresIn: Date;
            discount: number;
        })[];
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
