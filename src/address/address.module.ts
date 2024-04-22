import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ApiModule } from "src/Api/api.module";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";

@Module({ 
    controllers:[AddressController]
    ,providers:[AddressService],
    imports:[PrismaModule,ApiModule]
})
export class AddressModule {};