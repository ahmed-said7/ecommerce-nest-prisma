import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/product.create.dto";
import { UpdateProductDto, UpdateRelationsDto } from "./dto/product.update.dto";
import { ApiService } from "src/Api/api.service";
import { ProductQueryDto } from "./dto/product.query.dto";
export declare class ProductService {
    private prisma;
    private api;
    constructor(prisma: PrismaService, api: ApiService<ProductQueryDto>);
    private validateBrandId;
    private validateCategoryId;
    private validateSubcategoryIds;
    getProduct(id: number): Promise<{
        product: {
            id: number;
            price: number;
            discount: number;
            name: string;
            description: string;
            categoryId: number;
            images: string[];
            imageCover: string;
            colors: string[];
            brandId: number;
            ratingQuantity: number;
            ratingAverage: number;
            sold: number;
            quantity: number;
        };
    }>;
    deleteProduct(id: number): Promise<{
        product: {
            id: number;
            price: number;
            discount: number;
            name: string;
            description: string;
            categoryId: number;
            images: string[];
            imageCover: string;
            colors: string[];
            brandId: number;
            ratingQuantity: number;
            ratingAverage: number;
            sold: number;
            quantity: number;
        };
        status: string;
    }>;
    createProd(body: CreateProductDto): Promise<{
        product: {
            id: number;
            price: number;
            discount: number;
            name: string;
            description: string;
            categoryId: number;
            images: string[];
            imageCover: string;
            colors: string[];
            brandId: number;
            ratingQuantity: number;
            ratingAverage: number;
            sold: number;
            quantity: number;
        };
    }>;
    getAllprods(query: ProductQueryDto): Promise<{
        products: ({} & {
            id: number;
            price: number;
            discount: number;
            name: string;
            description: string;
            categoryId: number;
            images: string[];
            imageCover: string;
            colors: string[];
            brandId: number;
            ratingQuantity: number;
            ratingAverage: number;
            sold: number;
            quantity: number;
        })[];
    }>;
    updateProd(productId: number, body: UpdateProductDto): Promise<{
        product: {
            id: number;
            price: number;
            discount: number;
            name: string;
            description: string;
            categoryId: number;
            images: string[];
            imageCover: string;
            colors: string[];
            brandId: number;
            ratingQuantity: number;
            ratingAverage: number;
            sold: number;
            quantity: number;
        };
    }>;
    updateProductSubcategories(id: number, body: UpdateRelationsDto): Promise<{
        product: {
            id: number;
            price: number;
            discount: number;
            name: string;
            description: string;
            categoryId: number;
            images: string[];
            imageCover: string;
            colors: string[];
            brandId: number;
            ratingQuantity: number;
            ratingAverage: number;
            sold: number;
            quantity: number;
        };
    }>;
}
