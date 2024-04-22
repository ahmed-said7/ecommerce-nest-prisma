import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApiService } from "src/Api/api.service";
import { CreateCouponDto } from "./dto/create.coupon.dto";
import { UpdateCouponDto } from "./dto/update.coupon.dto";
import { CouponQueryDto } from "./dto/query.coupon.dto";


@Injectable()
export class CouponService {
    constructor(private prisma:PrismaService,private api:ApiService<CouponQueryDto>){};
    private async validateName(name:string){
        const coupon=await this.prisma.coupon.findFirst({where:{name}})
        if( coupon ){
            throw new HttpException("try another coupon code",400);
        };
    };
    async createCoupon(body:CreateCouponDto){
        this.validateName(body.name);
        const coupon=await this.prisma.coupon.create({data:body});
        return {coupon};
    };
    async getCoupon(id:number){
        const coupon=await this.prisma.coupon.
            findUnique({where:{id}});
        if( ! coupon  ){
            throw new HttpException("coupon not found",400);
        };
        return { coupon };
    };
    async deleteCoupon(id:number){
        try{
            const coupon=await this.prisma.coupon.delete({ where : { id } });
            return { status:"deleted" };
        } catch (e) { 
            throw new HttpException("coupon not found",400)
        };
    };
    async getAllCoupons(query:CouponQueryDto){
        const { obj }=this.api.filter(query).sort()
            .select().pagination().include();
        // @ts-ignore
        const coupons=await this.prisma.coupon.findMany(obj);
        return { coupons }
    };
    async updateCoupon(id:number,body:UpdateCouponDto){
        if(body.name){
            this.validateName(body.name);
        };
        try{
            const coupon=await this.prisma.
                coupon.update({ where : { id } , data:body });
            return { coupon };
        } catch (e) { 
            throw new HttpException("coupon not found",400)
        };
    };
};