import { CallHandler, ExecutionContext, HttpException, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import * as sharp from "sharp";
import { v4 } from "uuid";
import { enumeration } from "../enums/enum";



@Injectable()
export class ResizeProductFilesInterceptor implements NestInterceptor  {
    async intercept( context: ExecutionContext, next: CallHandler ) {
        const req=context.switchToHttp().getRequest<Request>();
        if( ! req.files || Array.isArray(req.files) ){
            return next.handle();
        };
        if( req.files.images ){
            const images=[];
            const result=req.files.images.map( async (image) => {
                const filename=`product-${v4()}-${Date.now()}.jpeg`;
                images.push(filename);
                return sharp(image.buffer).resize(500,500)
                    .toFormat("jpeg").jpeg({quality:90})
                    .toFile(`src/uploads/product/${filename}`)
            });
            await Promise.all(result);
            req.body.images=images;
        };
        if( req.files.imageCover ){
            const filename=`product-${v4()}-${Date.now()}.jpeg`;
            req.body.imageCover=filename;
            await sharp(req.files.imageCover[0].buffer)
                .resize(500,500)
                .toFormat("jpeg").jpeg({quality:90})
                .toFile(`src/uploads/product/${filename}`);
        };
        return next.handle();
    };
};