import { UpdateBrandDto } from "./dto/brand.update.dto";
import { CreateBrandDto } from "./dto/brand.create.dto";
import { BrandQueryDto } from "./dto/brand.query.dto";
import { BrandService } from "./brand.service";
export declare class BrandController {
    private brandService;
    constructor(brandService: BrandService);
    getAllBrands(query: BrandQueryDto): Promise<{
        brands: ({} & {
            id: number;
            name: string;
            image: string;
        })[];
    }>;
    createBrand(body: CreateBrandDto): Promise<{
        brand: {
            id: number;
            name: string;
            image: string;
        };
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
