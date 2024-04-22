import { CanActivate, ExecutionContext } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
export declare class AuthenticationGuard implements CanActivate {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
