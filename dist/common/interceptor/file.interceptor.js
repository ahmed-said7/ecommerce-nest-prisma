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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeSingleFileInterceptor = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const uuid_1 = require("uuid");
const enum_1 = require("../enums/enum");
let ResizeSingleFileInterceptor = class ResizeSingleFileInterceptor {
    constructor(folder) {
        this.folder = folder;
    }
    ;
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        if (!req.file) {
            return next.handle();
        }
        ;
        if (!req.file.mimetype.startsWith("image")) {
            throw new common_1.HttpException("file type should be image", 400);
        }
        ;
        const filename = `${this.folder}-${(0, uuid_1.v4)()}-${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat("jpeg").jpeg({ quality: 90 })
            .toFile(`src/uploads/${this.folder}/${filename}`);
        req.body.image = filename;
        return next.handle();
    }
    ;
};
exports.ResizeSingleFileInterceptor = ResizeSingleFileInterceptor;
exports.ResizeSingleFileInterceptor = ResizeSingleFileInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(enum_1.enumeration.Folder)),
    __metadata("design:paramtypes", [String])
], ResizeSingleFileInterceptor);
;
//# sourceMappingURL=file.interceptor.js.map