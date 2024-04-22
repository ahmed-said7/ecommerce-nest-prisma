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
exports.UserService = exports.userType = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrybtjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const nodemailer_service_1 = require("../nodemailer/nodemailer.service");
var userType;
(function (userType) {
    userType["user"] = "user";
    userType["admin"] = "admin";
    userType["manager"] = "manager";
})(userType || (exports.userType = userType = {}));
;
;
let UserService = class UserService {
    constructor(prisma, config, nodemailer) {
        this.prisma = prisma;
        this.config = config;
        this.nodemailer = nodemailer;
    }
    ;
    async signup(body, res) {
        const valid = await this.validateEmail(body.email);
        if (valid) {
            throw new common_1.HttpException("email already exists", 400);
        }
        ;
        body.password = await this.hashPassword(body.password);
        ;
        const user = await this.prisma.user.create({ data: body });
        const token = this.createToken(user.id, res);
        res.status(200).json({ token: `Bearer ${token}` });
    }
    ;
    async createUser(body) {
        const valid = await this.validateEmail(body.email);
        if (valid) {
            throw new common_1.HttpException("email already exists", 400);
        }
        ;
        body.password = await this.hashPassword(body.password);
        ;
        const user = await this.prisma.user.create({ data: body });
        return { user };
    }
    ;
    async login(body, res) {
        const user = await this.validateEmail(body.email);
        if (!user) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        await this.comparePassword(body.password, user.password, "password or email is not correct");
        const token = this.createToken(user.id, res);
        res.status(200).json({ token: `Bearer ${token}` });
    }
    ;
    async updateUser(body, id) {
        if (body.email) {
            const valid = await this.validateEmail(body.email);
            if (valid) {
                throw new common_1.HttpException("email already exists", 400);
            }
            ;
        }
        ;
        try {
            const user = await this.prisma.user.update({ where: { id }, data: body });
            return { user };
        }
        catch (e) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
    }
    ;
    async deleteUser(id) {
        try {
            await this.prisma.user.delete({ where: { id } });
            return { status: "deleted" };
        }
        catch (e) {
            throw new common_1.HttpException('user not found', 400);
        }
        ;
    }
    ;
    async getUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.HttpException('user not found', 400);
        }
        ;
        return { user };
    }
    ;
    async changeLoggedUserPassword(body, user) {
        if (body.password !== body.passwordConfirm) {
            throw new common_1.HttpException("password mismatch", 400);
        }
        ;
        await this.comparePassword(body.currentPassword, user.password, "current password is not correct");
        const password = await this.hashPassword(body.password);
        try {
            const updated = await this.prisma.user.update({ where: { id: user.id },
                data: { password, passwordChangedAt: new Date() } });
            return { user: updated };
        }
        catch (e) {
            throw new common_1.HttpException('user not found', 400);
        }
        ;
    }
    ;
    async forgetPassword(email) {
        const valid = await this.validateEmail(email);
        if (!valid) {
            throw new common_1.HttpException('user not found', 400);
        }
        ;
        const code = (0, crypto_1.randomBytes)(3).toString('hex');
        const hash = (0, crypto_1.createHash)("sha256").update(code).digest('hex');
        const expiresIn = new Date(Date.now() + 10 * 60 * 1000);
        const user = await this.prisma.user.update({
            where: { id: valid.id },
            data: { passwordResetCode: hash, passwordResetCodeExpiresIn: expiresIn }
        });
        try {
            this.nodemailer.sendResetCode(user.email, code);
        }
        catch (err) {
            await this.prisma.user.update({
                where: { id: valid.id },
                data: { passwordResetCode: null, passwordResetCodeExpiresIn: null }
            });
        }
        return { user, code };
    }
    ;
    async validateResetCode(code, body) {
        const hash = (0, crypto_1.createHash)("sha256").update(code).digest('hex');
        const user = await this.prisma.user.findFirst({ where: { passwordResetCode: hash, passwordResetCodeExpiresIn: { gt: new Date() } } });
        if (!user) {
            throw new common_1.HttpException('reset code is not valid', 400);
        }
        ;
        if (body.password !== body.passwordConfirm) {
            throw new common_1.HttpException("password mismatch", 400);
        }
        ;
        const password = await this.hashPassword(body.password);
        try {
            const updated = await this.prisma.user.update({
                where: { id: user.id }, data: { password, passwordChangedAt: new Date() }
            });
            return { user: updated };
        }
        catch (e) {
            throw new common_1.HttpException('user not found', 400);
        }
        ;
    }
    ;
    createToken(id, res) {
        const token = jwt.sign({ userId: id }, this.config.get("secure_jwt"), { expiresIn: "4d" });
        res.cookie("token", token, { maxAge: 4 * 24 * 3600 * 1000, secure: false });
        return token;
    }
    ;
    async validateEmail(email) {
        const user = await this.prisma.user.findFirst({ where: { email } });
        return user;
    }
    ;
    async comparePassword(password, hash, message) {
        const valid = await bcrybtjs.compare(password, hash);
        if (!valid) {
            throw new common_1.HttpException(message, 400);
        }
        ;
    }
    ;
    async hashPassword(password) {
        return bcrybtjs.hash(password, 10);
    }
    ;
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService, nodemailer_service_1.NodemailerService])
], UserService);
;
//# sourceMappingURL=user.service.js.map