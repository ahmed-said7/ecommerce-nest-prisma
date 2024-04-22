import { PrismaService } from "src/prisma/prisma.service";
import { ApiService } from "src/Api/api.service";
import { BrandQueryDto } from "./dto/brand.query.dto";
import { CreateBrandDto } from "./dto/brand.create.dto";
import { UpdateBrandDto } from "./dto/brand.update.dto";
export declare class BrandService {
    private prisma;
    private api;
    constructor(prisma: PrismaService, api: ApiService<BrandQueryDto>);
    createBrand(body: CreateBrandDto): Promise<{
        brand: {
            id: number;
            name: string;
            image: string;
        };
    }>;
    getAllBrands(query: BrandQueryDto): Promise<{
        brands: ({} & {
            id: number;
            name: string;
            image: string;
        })[];
    }>;
    getBrand(id: number): Promise<{
        brand: {
            id: number;
            name: string;
            image: string;
        };
    }>;
    deleteBrand(id: number): Promise<{
        brand: {
            id: number;
            name: string;
            image: string;
        };
        status: string;
    }>;
    updateBrand(id: number, body: UpdateBrandDto): Promise<{
        brand: {
            id: number;
            name: string;
            image: string;
        };
    }>;
}
