"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeProductFilesInterceptor = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const uuid_1 = require("uuid");
let ResizeProductFilesInterceptor = class ResizeProductFilesInterceptor {
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        if (!req.files || Array.isArray(req.files)) {
            return next.handle();
        }
        ;
        if (req.files.images) {
            const images = [];
            const result = req.files.images.map(async (image) => {
                const filename = `product-${(0, uuid_1.v4)()}-${Date.now()}.jpeg`;
                images.push(filename);
                return sharp(image.buffer).resize(500, 500)
                    .toFormat("jpeg").jpeg({ quality: 90 })
                    .toFile(`src/uploads/product/${filename}`);
            });
            await Promise.all(result);
            req.body.images = images;
        }
        ;
        if (req.files.imageCover) {
            const filename = `product-${(0, uuid_1.v4)()}-${Date.now()}.jpeg`;
            req.body.imageCover = filename;
            await sharp(req.files.imageCover[0].buffer)
                .resize(500, 500)
                .toFormat("jpeg").jpeg({ quality: 90 })
                .toFile(`src/uploads/product/${filename}`);
        }
        ;
        return next.handle();
    }
    ;
};
exports.ResizeProductFilesInterceptor = ResizeProductFilesInterceptor;
exports.ResizeProductFilesInterceptor = ResizeProductFilesInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResizeProductFilesInterceptor);
;
//# sourceMappingURL=product.interceptor.js.map