import { HttpException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/product.create.dto";
import {  UpdateProductDto, UpdateRelationsDto } from "./dto/product.update.dto";
import { ApiService } from "src/Api/api.service";
import { ProductQueryDto } from "./dto/product.query.dto";

@Injectable()
export class ProductService {
    constructor(private prisma:PrismaService , private api:ApiService<ProductQueryDto>){};
    private async validateBrandId(brandId:number){
        const brand=await this.prisma.brand.findUnique({where:{id:brandId}});
        if(!brand){
            throw new HttpException("brand not found",400);
        };
    };
    private async validateCategoryId(categoryId:number){
        const cat=await this.prisma.category.findUnique({where:{id:categoryId}});
        if(!cat){
            throw new HttpException("category not found",400);
        };
    };
    private async validateSubcategoryIds(subIds:number[]){
        const subcats=await this.prisma.subcategory
        .findMany({where:{id:{in:subIds}},select:{id:true}});
        if( subcats.length !== subIds.length ){
            throw new HttpException("Subcategory ids is not valid",400)
        };
        return subcats;
    };
    async getProduct(id:number){
        const product=await this.prisma.product.findUnique({where:{id}});
        if( !product ){
            throw new HttpException("product not found",400);
        };
        return { product };
    };
    async deleteProduct(id:number){
        try{
            const product = await this.prisma.product.delete({where:{id}});
            return { product , status:"deleted" };
        }catch(err){
            throw new HttpException("Product not found", 400);
        };
    };
    async createProd(body:CreateProductDto){
        this.validateBrandId(body.brandId);
        this.validateCategoryId(body.categoryId);
        
        const subcats=await this.validateSubcategoryIds(body.subcategories);
        delete body.subcategories;
        const product=await this.prisma.product.create({
            data: { ... body , subcategories:{connect:subcats} }
        });
        return { product };
    };
    async getAllprods( query:ProductQueryDto ){
        const obj=this.api.filter(query).sort().select()
            .pagination()
            .include({brand:true,subcategory:true,category:true}).obj;
        // @ts-ignore
        const products=await this.prisma.product.findMany( obj );
        return { products };
    };
    async updateProd(productId:number,body:UpdateProductDto){
        if(body.brandId){
            this.validateBrandId(body.brandId);
        };
        if(body.categoryId){
            this.validateBrandId(body.categoryId);
        };
        try{
            const product=await this.prisma.product.update({
                where:{id:productId},
                data: body
            });
            return { product };
        }catch(e){
            throw new HttpException(`product not found`,400);
        };
    };
    async updateProductSubcategories( id:number , body:UpdateRelationsDto ){
        const subcats=await this.validateSubcategoryIds(body.subcategories);
        try{
            const product=await this.prisma.product.update({ 
                where : { id },
                data : { subcategories: { connect : subcats } } 
            });
            return { product };
        }catch(e){
            throw new HttpException("Product not found",400);
        }
    };
};