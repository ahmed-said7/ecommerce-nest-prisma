import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { ApiModule } from "src/Api/api.module";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";




@Module({ 
    controllers:[WishlistController]
    ,providers:[WishlistService],
    imports:[PrismaModule,ApiModule]
})
export class WishlistModule {};