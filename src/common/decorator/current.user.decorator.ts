import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";


declare global {
    namespace Express {
        interface Request {
            user : {
                id:number;
                name: string;
                email: string;
                password: string;
                image?: string;
                passwordChangedAt?: Date;
                role: string;
                passwordResetCode?: string
                passwordResetCodeExpiresIn?: Date;
            };
        }
    }
};

export const User=createParamDecorator((data:unknown,ctx:ExecutionContext)=>{
    const req=ctx.switchToHttp().getRequest<Request>();
    return req.user;
});