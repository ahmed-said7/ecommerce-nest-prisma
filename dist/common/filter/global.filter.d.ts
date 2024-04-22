import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";
export declare class globalPrismaFilterException implements ExceptionFilter {
    catch(exception: PrismaClientUnknownRequestError, host: ArgumentsHost): Response<any, Record<string, any>>;
}
