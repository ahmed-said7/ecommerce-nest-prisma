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
exports.NodemailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let NodemailerService = class NodemailerService {
    constructor(config) {
        this.transport = nodemailer.createTransport({
            host: config.get('host'),
            port: config.get('port'),
            auth: {
                user: config.get("user"),
                pass: config.get("pass")
            }
        });
    }
    ;
    sendResetCode(to, code) {
        const subject = "reset code to change password";
        const text = `your reset code to change password is ${code}`;
        return this.send({ subject, text, to });
    }
    ;
    send(opts) {
        return this.transport.sendMail({ ...opts, from: "tanta engineering" });
    }
    ;
};
exports.NodemailerService = NodemailerService;
exports.NodemailerService = NodemailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NodemailerService);
;
//# sourceMappingURL=nodemailer.service.js.map