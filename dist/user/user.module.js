"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const nodemailer_module_1 = require("../nodemailer/nodemailer.module");
const user_controller_1 = require("./controller/user.controller");
const auth_controller_1 = require("./controller/auth.controller");
const user_service_1 = require("./user.service");
const pass_controller_1 = require("./controller/pass.controller");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [pass_controller_1.PassController, user_controller_1.UserController, auth_controller_1.AuthController],
        providers: [user_service_1.UserService, { provide: 'folder', useValue: "user" }],
        imports: [prisma_module_1.PrismaModule, nodemailer_module_1.NodemailerModule]
    })
], UserModule);
;
//# sourceMappingURL=user.module.js.map