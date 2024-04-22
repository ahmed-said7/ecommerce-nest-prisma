import { IsNotEmpty, IsOptional, IsString } from "class-validator"




export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    city:string
    @IsNotEmpty()
    @IsString()
    street:string
    @IsNotEmpty()
    @IsString()
    postalCode:string
};

export class UpdateAddressDto {
    @IsOptional()
    @IsString()
    city:string
    @IsOptional()
    @IsString()
    street:string
    @IsOptional()
    @IsString()
    postalCode:string
};