import { PrismaService } from "src/prisma/prisma.service";
import { CreateAddressDto, UpdateAddressDto } from "./dto/address.dto";
import { UserInterface } from "src/user/user.service";
export declare class AddressService {
    private prisma;
    constructor(prisma: PrismaService);
    addAddress(body: CreateAddressDto, user: UserInterface): Promise<{
        address: {
            addresses: {
                id: number;
                city: string;
                street: string;
                postalCode: string;
                userId: number;
            }[];
        };
    }>;
    deleteAddress(id: number, user: UserInterface): Promise<{
        status: string;
    }>;
    updateAddress(body: UpdateAddressDto, id: number, user: UserInterface): Promise<{
        address: {
            id: number;
            city: string;
            street: string;
            postalCode: string;
            userId: number;
        };
    }>;
    getUserAddresses(userId: number): Promise<{
        address: {
            addresses: {
                id: number;
                city: string;
                street: string;
                postalCode: string;
                userId: number;
            }[];
        };
    }>;
}
