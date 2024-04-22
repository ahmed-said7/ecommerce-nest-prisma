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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AddressService = class AddressService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    ;
    async addAddress(body, user) {
        const address = await this.prisma.user.update({
            where: { id: user.id },
            data: { addresses: { create: body } },
            select: { addresses: true }
        });
        return { address };
    }
    ;
    async deleteAddress(id, user) {
        const address = await this.prisma.address.findFirst({ where: { id } });
        if (!address) {
            throw new common_1.HttpException("Could not find address", 400);
        }
        ;
        if (user.role == "user" && user.id != address.userId) {
            throw new common_1.HttpException("you are not allowed", 400);
        }
        ;
        await this.prisma.address.delete({
            where: { id }
        });
        return { status: "address deleted" };
    }
    ;
    async updateAddress(body, id, user) {
        const address = await this.prisma.address.findFirst({ where: { id } });
        if (!address) {
            throw new common_1.HttpException("Could not find address", 400);
        }
        ;
        if (user.role == "user" && user.id != address.userId) {
            throw new common_1.HttpException("you are not allowed", 400);
        }
        ;
        const addressUpdated = await this.prisma.address.update({
            where: { id },
            data: body
        });
        return { address: addressUpdated };
    }
    ;
    async getUserAddresses(userId) {
        const address = await this.prisma.user.findFirst({
            where: { id: userId },
            select: { addresses: true }
        });
        if (!address) {
            throw new common_1.HttpException("Address not found", 400);
        }
        ;
        return { address };
    }
    ;
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressService);
;
//# sourceMappingURL=address.service.js.map