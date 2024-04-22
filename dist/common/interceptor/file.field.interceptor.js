"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fieldsInterceptor = (field1, field2) => (0, platform_express_1.FileFieldsInterceptor)([
    { name: field1, maxCount: 8 }, { name: field2, maxCount: 1 }
], {
    storage: (0, multer_1.memoryStorage)(),
    fileFilter(req, file, callback) {
        if (!file.mimetype.startsWith("image")) {
            return callback(new common_1.HttpException("file type should be image", 400), false);
        }
        ;
        return callback(null, true);
    }
});
exports.fieldsInterceptor = fieldsInterceptor;
//# sourceMappingURL=file.field.interceptor.js.map