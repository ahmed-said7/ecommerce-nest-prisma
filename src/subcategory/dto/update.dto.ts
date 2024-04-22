import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSubcatDto {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    image: string;
    @IsOptional()
    @IsNumber()
    categoryId: number;
};