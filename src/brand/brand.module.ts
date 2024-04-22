import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { ApiModule } from "src/Api/api.module";
import { BrandService } from "./brand.service";
import { BrandController } from "./brand.controller";


@Module({ 
    controllers:[BrandController]
    ,providers:[BrandService,{provide:"folder",useValue:"brand"}],
    imports:[PrismaModule,ApiModule]
})
export class BrandModule {};