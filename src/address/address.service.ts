import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAddressDto, UpdateAddressDto } from "./dto/address.dto";
import { UserInterface } from "src/user/user.service";


@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService){};
    async addAddress(body:CreateAddressDto,user:UserInterface){
        const address=await this.prisma.user.update({
            where:{id:user.id},
            data : { addresses : { create : body } }
            ,select:{addresses:true}
        });
        return { address };
    };
    async deleteAddress(id:number,user:UserInterface){
        const address=await this.prisma.address.findFirst({ where:{id} });
        if(!address){
            throw new HttpException("Could not find address",400);
        };
        if( user.role== "user" && user.id != address.userId ){
            throw new HttpException("you are not allowed",400)
        };
        await this.prisma.address.delete({
            where:{id}
        });
        return {status:"address deleted"};
    };
    async updateAddress(body:UpdateAddressDto,id:number,user:UserInterface){
        const address=await this.prisma.address.findFirst({ where:{id} });
        if(!address){
            throw new HttpException("Could not find address",400);
        };
        if( user.role== "user" && user.id != address.userId ){
            throw new HttpException("you are not allowed",400)
        };
        const addressUpdated=await this.prisma.address.update({
            where:{id},
            data:body
        });
        return { address : addressUpdated };
    };
    async getUserAddresses(userId:number){
        const address=await this.prisma.user.findFirst({
            where:{id:userId}
            ,select:{addresses:true}
        });
        if(!address){
            throw new HttpException("Address not found",400);
        };
        return { address };
    };
};