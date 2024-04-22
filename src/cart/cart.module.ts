import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { ApiModule } from "src/Api/api.module";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";



@Module({ 
    controllers:[CartController]
    ,providers:[CartService],
    imports:[PrismaModule,ApiModule]
})
export class CartModule {};