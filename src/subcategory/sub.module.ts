import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ApiModule } from "src/Api/api.module";
import { SubcatService } from "./sub.service";
import { SubcatController } from "./sub.controller";


@Module({ 
    controllers:[SubcatController]
    ,providers:[SubcatService,{provide:"folder",useValue:"subcategory"}],
    imports:[PrismaModule,ApiModule]
})
export class SubcatModule {};