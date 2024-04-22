import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSubcatDto {
    @IsNotEmpty()
    @IsNumber()
    categoryId:number;
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    image:string;
};