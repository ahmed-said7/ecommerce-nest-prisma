import { SubcatService } from "./sub.service";
import { CreateSubcatDto } from "./dto/create.sub.dto";
import { SubcatQueryDto } from "./dto/query.dto";
import { UpdateSubcatDto } from "./dto/update.dto";
export declare class SubcatController {
    private SubService;
    constructor(SubService: SubcatService);
    getAllSub(query: SubcatQueryDto): Promise<{
        subcategories: ({} & {
            id: number;
            name: string;
            image: string;
            categoryId: number;
        })[];
    }>;
    getSub(id: number): Promise<{
        subcategory: {
            category: {
                id: number;
                name: string;
                image: string;
            };
        } & {
            id: number;
            name: string;
            image: string;
            categoryId: number;
        };
    }>;
    createSub(body: CreateSubcatDto): Promise<{
        subctegory: {
            id: number;
            name: string;
            image: string;
            categoryId: number;
        };
    }>;
    updateSub(body: UpdateSubcatDto, id: number): Promise<{
        subcategory: {
            id: number;
            name: string;
            image: string;
            categoryId: number;
        };
    }>;
    deleteSub(id: number): Promise<{
        subcategory: {
            id: number;
            name: string;
            image: string;
            categoryId: number;
        };
        status: string;
    }>;
}
