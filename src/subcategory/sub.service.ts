import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSubcatDto } from "./dto/create.sub.dto";
import { ApiService } from "src/Api/api.service";
import { SubcatQueryDto } from "./dto/query.dto";
import { UpdateSubcatDto } from "./dto/update.dto";


@Injectable()
export class SubcatService {
    constructor(private prisma:PrismaService,private api:ApiService<SubcatQueryDto>){};
    private async validateCat(id:number){
        const cat=await this.prisma.category.findUnique({where:{id}})
        if(!cat){
            throw new HttpException("category not found",400);
        };
    };
    async createSubcat(body:CreateSubcatDto){
        this.validateCat(body.categoryId);
        const sub=await this.prisma.subcategory.create({data:body});
        return {subctegory:sub};
    };
    async getSubcat(id:number){
        const subcat=await this.prisma.subcategory.
            findUnique({where:{id},include:{category:true}});
        if( ! subcat ){
            throw new HttpException("subcat not found",400);
        };
        return { subcategory:subcat };
    };
    async deleteSubcat(id:number){
        try{
            const subcategory=await this.prisma.subcategory.delete({ where : { id } });
            return { subcategory,status:"deleted" };
        } catch (e) { 
            throw new HttpException("subcategory not found",400)
        };
    };
    async getAllSubcategories(query:SubcatQueryDto){
        const { obj }=this.api.filter(query).sort()
            .select().pagination().include({category:true});
        // @ts-ignore
        const subcategories=await this.prisma.subcategory.findMany(obj);
        return { subcategories }
    };
    async updateSubcategories(id:number,body:UpdateSubcatDto){
        if(body.categoryId){
            this.validateCat(body.categoryId);
        };
        try{
            const subcategory=await this.prisma.
                subcategory.update({ where : { id } , data:body });
            return { subcategory };
        } catch (e) { 
            throw new HttpException("subcategory not found",400)
        };
    };
};