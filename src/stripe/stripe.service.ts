import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Stripe } from "stripe";


@Injectable()
export class StripeService {
    client:Stripe;
    constructor(config:ConfigService){
        this.client=new Stripe(config.get<string>("secret_key"),{apiVersion:"2024-04-10"});
    };
    get stripe(){
        if( ! this.client ){
            throw new HttpException("No stripe client found",400);
        };
        return this.client;
    };
};