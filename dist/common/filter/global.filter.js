"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalPrismaFilterException = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let globalPrismaFilterException = class globalPrismaFilterException {
    catch(exception, host) {
        const req = host.switchToHttp().getRequest();
        const res = host.switchToHttp().getRequest();
        if (exception.name === "PrismaClientUnknownRequestError") {
            const msg = exception.message;
            return res.status(400).json({ message: msg, status: "failed" });
        }
        ;
    }
};
exports.globalPrismaFilterException = globalPrismaFilterException;
exports.globalPrismaFilterException = globalPrismaFilterException = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientUnknownRequestError)
], globalPrismaFilterException);
;
//# sourceMappingURL=global.filter.js.map