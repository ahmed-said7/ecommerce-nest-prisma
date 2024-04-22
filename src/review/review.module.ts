import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { ApiModule } from "src/Api/api.module";
import { PrismaModule } from "src/prisma/prisma.module";



@Module({
    providers:[ReviewService],controllers:[ReviewController],
    imports:[ApiModule,PrismaModule]})
export class ReviewModule {
};