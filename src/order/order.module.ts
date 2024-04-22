import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { ApiModule } from "src/Api/api.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { StripeModule } from "src/stripe/stripe.module";




@Module({ 
    controllers:[OrderController]
    ,providers:[OrderService],
    imports:[PrismaModule,ApiModule,StripeModule]
})
export class OrderModule {};