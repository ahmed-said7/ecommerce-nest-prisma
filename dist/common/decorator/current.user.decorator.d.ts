declare global {
    namespace Express {
        interface Request {
            user: {
                id: number;
                name: string;
                email: string;
                password: string;
                image?: string;
                passwordChangedAt?: Date;
                role: string;
                passwordResetCode?: string;
                passwordResetCodeExpiresIn?: Date;
            };
        }
    }
}
export declare const User: (...dataOrPipes: unknown[]) => ParameterDecorator;
