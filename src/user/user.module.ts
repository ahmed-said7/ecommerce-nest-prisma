import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { NodemailerModule } from "src/nodemailer/nodemailer.module";
import { UserController } from "./controller/user.controller";
import { AuthController } from "./controller/auth.controller";
import { UserService } from "./user.service";
import { PassController } from "./controller/pass.controller";

@Module({
    controllers:[PassController,UserController,AuthController],
    providers:[UserService,{provide:'folder',useValue:"user"}],
    imports:[PrismaModule,NodemailerModule]
})

export class UserModule {};