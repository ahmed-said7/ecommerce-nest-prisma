import { ProductService } from "./product.service";
import { ProductQueryDto } from "./dto/product.query.dto";
import { UpdateProductDto, UpdateRelationsDto } from "./dto/product.update.dto";
import { CreateProductDto } from "./dto/product.create.dto";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(body: CreateProductDto): Promise<{
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
    updateSubcatProduct(id: number, body: UpdateRelationsDto): Promise<{
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
    updateProduct(id: number, body: UpdateProductDto): Promise<{
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
    getProducts(query: ProductQueryDto): Promise<{
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
}
