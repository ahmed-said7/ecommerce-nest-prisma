import { CategoryQuery } from "./dto/query.dto";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create.category";
import { UpdateCategoryDto } from "./dto/update.category.dto";
export declare class CategoryController {
    private catService;
    constructor(catService: CategoryService);
    getAllCats(query: CategoryQuery): Promise<{
        categories: ({} & {
            id: number;
            name: string;
            image: string;
        })[];
    }>;
    createCat(body: CreateCategoryDto): Promise<{
        category: {
            id: number;
            name: string;
            image: string;
        };
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
