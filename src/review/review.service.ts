import { PrismaService } from "src/prisma/prisma.service";
import { CreateReviewDto } from "./dto/create.review.dtos";
import { UserInterface } from "src/user/user.service";
import { HttpException } from "@nestjs/common";
import { ReviewQueryDto } from "./dto/query.review.dto";
import { ApiService } from "src/Api/api.service";
import { UpdateReviewDto } from "./dto/update.review.dto";



export class ReviewService {
    constructor(private prisma:PrismaService,private api:ApiService<ReviewQueryDto>) { };
    async createReview(body:CreateReviewDto,user:UserInterface){
        const product=await this.prisma.product.findUnique({where:{id:body.productId}});
        if( ! product ){
            throw new HttpException("Product not found",400);
        };
        let review=await this.prisma.review.findFirst({where:{
            userId:user.id,
            productId:body.productId
        }});
        if( review ){
            throw new HttpException("user has review product already",400);
        };
        body.userId=user.id;
        review =await this.prisma.review.create({
            data :  body,
            include:{user:true}
        });
        this.aggregation(review.productId);
        return { review };
    };
    async getAllReviews(query:ReviewQueryDto){
        const { obj }=this.api.filter(query)
        .sort().select().pagination().include({user:true});
        // @ts-ignore
        const reviews=await this.prisma.review.findMany(obj);
        return { reviews };
    };
    async getReview(id:number){
        const review = await this.prisma.review
        .findUnique({where:{id},select:{user:true}});
        if( ! review ){
            throw new HttpException("Review not found",400);
        };
        return {review};
    };
    async deleteReview(id:number,user:UserInterface){
        try{
            const review = await this.prisma.review.delete({where:{id,userId:user.id}});
            this.aggregation(review.productId);
            return { review };
        }catch(e){
            throw new HttpException("Review not found",400);
        };
    };
    async updateRrview(id:number,body:UpdateReviewDto,user:UserInterface){
        try{
            const review=await this.prisma.review.
                update({where:{id,userId:user.id},include:{user:true},data:body});
            if(body.rating){
                this.aggregation(review.productId);
            };
            return {review};
        }catch(e){
            throw new HttpException("review not found",400);
        };
    };
    private async aggregation(productId:number){
        const result=await this.prisma.review.groupBy({
            where : { productId } ,
            by : "productId" ,
            _count : {rating:true},
            _avg : {rating:true}
        });
        if(result.length > 0){
            await this.prisma.product.update({
                where : { id : productId },
                data : {
                    ratingAverage : result[0]._avg.rating ,
                    ratingQuantity : result[0]._count.rating
                }
            });
        }else{
            await this.prisma.product.update({
                where : { id : productId },
                data : {
                    ratingAverage : 0 ,
                    ratingQuantity : 0
                }
            })
        }
    };
};