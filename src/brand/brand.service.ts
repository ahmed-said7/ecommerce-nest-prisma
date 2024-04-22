import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApiService } from "src/Api/api.service";
import { BrandQueryDto } from "./dto/brand.query.dto";
import { CreateBrandDto } from "./dto/brand.create.dto";
import { UpdateBrandDto } from "./dto/brand.update.dto";

@Injectable()
export class BrandService {
    constructor(private prisma:PrismaService,private api:ApiService<BrandQueryDto>){};
    async createBrand(body:CreateBrandDto){
        const brand=await this.prisma.brand.create({ data:body });
        return { brand };
    };
    async getAllBrands(query:BrandQueryDto){
        const { obj }=this.api.filter(query).sort()
            .select().pagination().include();
        // @ts-ignore
        const brands=await this.prisma.brand.findMany(obj);
        return { brands }
    };
    async getBrand(id:number){
        const brand=await this.prisma.brand.findUnique({ where : { id } });
        if(!brand){
            throw new HttpException("brand not found",400);
        };
        return { brand };
    };
    async deleteBrand(id:number){
        try{
            const brand=await this.prisma.brand.delete({ where : { id } });
            return { brand,status:"deleted" };
        }catch(e){
            throw new HttpException("brand not found",400)
        }
    };
    async updateBrand(id:number,body:UpdateBrandDto){
        try{
            const brand=await this.prisma.brand.update({ 
                where : { id } , data:body
            });
            return { brand };
        }catch(e){
            throw new HttpException("brand not found",400)
        }
    };
};