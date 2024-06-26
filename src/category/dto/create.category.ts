import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @Length(4)
    name:string;
    @IsNotEmpty()
    @IsString()
    image:string
};