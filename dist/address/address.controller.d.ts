import { AddressService } from "./address.service";
import { CreateAddressDto, UpdateAddressDto } from "./dto/address.dto";
import { UserInterface } from "src/user/user.service";
export declare class AddressController {
    private addressService;
    constructor(addressService: AddressService);
    addAddresse(body: CreateAddressDto, user: UserInterface): Promise<{
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
    updateAddress(id: number, user: UserInterface, body: UpdateAddressDto): Promise<{
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
