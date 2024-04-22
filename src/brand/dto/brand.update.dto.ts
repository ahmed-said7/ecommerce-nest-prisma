import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
export class UpdateBrandDto {
    @IsOptional()
    @IsString()
    @Length(4)
    name:string;
    @IsOptional()
    @IsString()
    image:string
};