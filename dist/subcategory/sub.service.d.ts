import { PrismaService } from "src/prisma/prisma.service";
import { CreateSubcatDto } from "./dto/create.sub.dto";
import { ApiService } from "src/Api/api.service";
import { SubcatQueryDto } from "./dto/query.dto";
import { UpdateSubcatDto } from "./dto/update.dto";
export declare class SubcatService {
    private prisma;
    private api;
    constructor(prisma: PrismaService, api: ApiService<SubcatQueryDto>);
    private validateCat;
    createSubcat(body: CreateSubcatDto): Promise<{
        subctegory: {
            id: number;
            name: string;
            image: string;
            categoryId: number;
        };
    }>;
    getSubcat(id: number): Promise<{
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
    deleteSubcat(id: number): Promise<{
        subcategory: {
            id: number;
            name: string;
            image: string;
            categoryId: number;
        };
        status: string;
    }>;
    getAllSubcategories(query: SubcatQueryDto): Promise<{
        subcategories: ({} & {
            id: number;
            name: string;
            image: string;
            categoryId: number;
        })[];
    }>;
    updateSubcategories(id: number, body: UpdateSubcatDto): Promise<{
        subcategory: {
            id: number;
            name: string;
            image: string;
            categoryId: number;
        };
    }>;
}
