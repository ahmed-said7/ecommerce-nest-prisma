import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateBrandDto {
    @IsNotEmpty()
    @IsString()
    @Length(4)
    name:string;
    @IsNotEmpty()
    @IsString()
    image:string
};