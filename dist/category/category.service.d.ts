import { PrismaService } from "src/prisma/prisma.service";
import { ApiService } from "src/Api/api.service";
import { CategoryQuery } from "./dto/query.dto";
import { CreateCategoryDto } from "./dto/create.category";
import { UpdateCategoryDto } from "./dto/update.category.dto";
export declare class CategoryService {
    private prisma;
    private api;
    constructor(prisma: PrismaService, api: ApiService<CategoryQuery>);
    createCat(body: CreateCategoryDto): Promise<{
        category: {
            id: number;
            name: string;
            image: string;
        };
    }>;
    getAllCategories(query: CategoryQuery): Promise<{
        categories: ({} & {
            id: number;
            name: string;
            image: string;
        })[];
    }>;
    getCat(id: number): Promise<{
        category: {
            id: number;
            name: string;
            image: string;
        };
    }>;
    deleteCat(id: number): Promise<{
        category: {
            id: number;
            name: string;
            image: string;
        };
        status: string;
    }>;
    updateCat(id: number, body: UpdateCategoryDto): Promise<{
        category: {
            id: number;
            name: string;
            image: string;
        };
    }>;
}
