import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ApiModule } from "src/Api/api.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";



@Module({ 
    controllers:[ProductController]
    ,providers:[ProductService],
    imports:[PrismaModule,ApiModule]
})
export class ProductModule {};