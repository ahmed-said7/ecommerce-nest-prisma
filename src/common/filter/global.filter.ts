import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";


@Catch( Prisma.PrismaClientUnknownRequestError )
export class globalPrismaFilterException implements ExceptionFilter {
    catch(exception: PrismaClientUnknownRequestError, host: ArgumentsHost) {
        const req=host.switchToHttp().getRequest<Request>();
        const res=host.switchToHttp().getRequest<Response>();
        if( exception.name === "PrismaClientUnknownRequestError" ){
            const msg=exception.message;
            return res.status(400).json({ message: msg , status:"failed" });
        };
    }
};