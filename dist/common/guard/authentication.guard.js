"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
;
let AuthenticationGuard = class AuthenticationGuard {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    ;
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        ;
        if (!token) {
            throw new common_1.HttpException("token is required", 400);
        }
        ;
        let decoded;
        try {
            decoded = jwt.verify(token, this.config.get("secure_jwt"));
        }
        catch (e) {
            throw new common_1.HttpException("invalid token", 400);
        }
        ;
        const user = await this.prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            throw new common_1.HttpException("User not found", 400);
        }
        ;
        if (user.passwordChangedAt) {
            const stamp = Math.floor(user.passwordChangedAt.getTime() / 1000);
            if (decoded.iat < stamp) {
                throw new common_1.HttpException("User password changed", 400);
            }
            ;
        }
        ;
        req.user = user;
        return true;
    }
};
exports.AuthenticationGuard = AuthenticationGuard;
exports.AuthenticationGuard = AuthenticationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], AuthenticationGuard);
;
//# sourceMappingURL=authentication.guard.js.map