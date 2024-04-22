import { CallHandler, ExecutionContext, HttpException, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import * as sharp from "sharp";
import { v4 } from "uuid";
import { enumeration } from "../enums/enum";



@Injectable()
export class ResizeSingleFileInterceptor implements NestInterceptor  {
    constructor( @Inject(enumeration.Folder) private folder:string ) {};
    async intercept( context: ExecutionContext, next: CallHandler ) {
        const req=context.switchToHttp().getRequest<Request>();
        if(!req.file){
            return next.handle();
        };
        if( ! req.file.mimetype.startsWith("image") ){
            throw new HttpException("file type should be image",400);
        };
        const filename=`${this.folder}-${v4()}-${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(500,500)
            .toFormat("jpeg").jpeg({quality:90})
            .toFile(`src/uploads/${this.folder}/${filename}`);
        req.body.image=filename;
        return next.handle();
    };
};