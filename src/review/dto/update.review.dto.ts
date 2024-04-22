import { IsOptional, IsNumber, IsString, Max, Min } from "class-validator";


export class UpdateReviewDto {
    @IsOptional()
    @IsString()
    comment:string;
    @IsOptional()
    @IsNumber()
    @Max(5)
    @Min(1)
    rating:number;
};