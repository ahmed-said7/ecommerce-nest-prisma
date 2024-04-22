import { Injectable } from "@nestjs/common";

interface Q {
    select?:string;
    sort?:string;
    keyword?:string;
    limit?:number;
    page?:number;
};


@Injectable()
export class ApiService< T extends Q > {
    queryInclude : { [k:string]:boolean };
    obj={ where:{} , orderBy:[] , select:{},include:{} , skip:0 , take:10 };
    query:T;
    filter(q:T){
        this.query=q;
        const queryObj={ ... this.query };
        const fields=['select',"sort","keyword","limit","page"];
        fields.forEach( field => delete queryObj[field] );
        this.obj.where=queryObj;
        return this;
    };
    select(){
        if( this.query?.select ){
            this.query.select.split(",").
                forEach( ( field ) => {
                    console.log( field);
                    this.obj.select[field] = true; 
                });
        } else {
            delete this.obj.select;
        };
        return this;
    };
    sort(){
        if( this.query?.sort ){
            const sort=this.query.sort.split(",");
            this.obj.orderBy=sort.map( (field) => {
                if(field.startsWith("-")){
                    return { [ field.slice(1) ] : "desc" }
                };
                return { [ field ] : "asc"  };
            });
        }else{
            delete this.obj.orderBy;
        };
        return this;
    };
    pagination(){
        const take=this.query?.limit || 10;
        const page=this.query?.page || 1;
        const skip= ( page - 1 ) * take ;
        this.obj.take=take;
        this.obj.skip=skip;
        return this;
    };
    include( query? : { [k:string]:boolean }  ){
        if( this.obj.select && query ){
            this.obj.select = { ... this.obj.select , ... query } ;
            delete this.obj.include;
        } else if ( this.obj.include && query ) {
            this.obj.include=query;
        } else {
            delete this.obj.include;
        }
        return this;
    };
};