import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { ApiModule } from "src/Api/api.module";


@Module({ 
    controllers:[CategoryController]
    ,providers:[CategoryService,{provide:"folder",useValue:"category"}],
    imports:[PrismaModule,ApiModule]
})
export class CategoryModule {};