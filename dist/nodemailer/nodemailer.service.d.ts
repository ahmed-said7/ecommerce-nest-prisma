import { ConfigService } from "@nestjs/config";
interface Options {
    subject: string;
    to: string;
    text: string;
}
export declare class NodemailerService {
    private readonly transport;
    constructor(config: ConfigService);
    sendResetCode(to: string, code: string): any;
    send(opts: Options): any;
}
export {};
