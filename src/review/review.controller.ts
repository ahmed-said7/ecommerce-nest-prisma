import { Controller,Get,Post,Patch, Param, ParseIntPipe, Query, Body, Delete, UseGuards, SetMetadata } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewQueryDto } from "./dto/query.review.dto";
import { CreateReviewDto } from "./dto/create.review.dtos";
import { User } from "src/common/decorator/current.user.decorator";
import { UserInterface, userType } from "src/user/user.service";
import { UpdateReviewDto } from "./dto/update.review.dto";
import { AuthenticationGuard } from "src/common/guard/authentication.guard";
import { AuthorizationGuard } from "src/common/guard/authorization.guard";



@Controller("review")
export class ReviewController {
    constructor(private reviewService:ReviewService){};
    @Get()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    getReviews(@Query() query:ReviewQueryDto){
        return this.reviewService.getAllReviews(query);
    };
    @Get(":id")
    getReview( @Param( "id" , ParseIntPipe ) id:number ){
        return this.reviewService.getReview(id);
    };
    @Post()
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    createReview( @Body() body:CreateReviewDto,@User() user:UserInterface ){
        return this.reviewService.createReview(body,user);
    };
    @Delete(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    deleteReview(  @Param( "id" , ParseIntPipe ) id:number ,  @User() user:UserInterface ){
        return this.reviewService.deleteReview(id,user);
    };
    @Patch(":id")
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @SetMetadata("roles",[userType.manager,userType.admin,userType.user])
    updateReview(  
        @Param( "id" , ParseIntPipe ) id:number , @User() user:UserInterface ,
        @Body() body:UpdateReviewDto 
    ){
        return this.reviewService.updateRrview(id,body,user);
    };
};