import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApiService } from "src/Api/api.service";
import { CategoryQuery } from "./dto/query.dto";
import { CreateCategoryDto } from "./dto/create.category";
import { UpdateCategoryDto } from "./dto/update.category.dto";

@Injectable()
export class CategoryService {
    constructor(private prisma:PrismaService,private api:ApiService<CategoryQuery>){};
    async createCat(body:CreateCategoryDto){
        const category=await this.prisma.category.create({ data:body });
        return { category };
    };
    async getAllCategories(query:CategoryQuery){
        const { obj }=this.api.filter(query).sort().select()
            .pagination().include();
        // @ts-ignore
        const categories=await this.prisma.category.findMany(obj);
        return { categories }
    };
    async getCat(id:number){
        const cat=await this.prisma.category.findUnique({ where : { id } });
        if(!cat){
            throw new HttpException("category not found",400);
        };
        return { category:cat };
    };
    async deleteCat(id:number){
        try{
            const category=await this.prisma.category.delete({ where : { id } });
            return { category,status:"deleted" };
        }catch(e){
            throw new HttpException("category not found",400)
        }
    };
    async updateCat(id:number,body:UpdateCategoryDto){
        try{
            const category=await this.prisma.category.update({ 
                where : { id } , data:body
            });
            return { category };
        }catch(e){
            throw new HttpException("category not found",400)
        }
    };
};