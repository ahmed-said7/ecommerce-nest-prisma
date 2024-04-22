import { PrismaService } from "src/prisma/prisma.service";
import { CreateReviewDto } from "./dto/create.review.dtos";
import { UserInterface } from "src/user/user.service";
import { ReviewQueryDto } from "./dto/query.review.dto";
import { ApiService } from "src/Api/api.service";
import { UpdateReviewDto } from "./dto/update.review.dto";
export declare class ReviewService {
    private prisma;
    private api;
    constructor(prisma: PrismaService, api: ApiService<ReviewQueryDto>);
    createReview(body: CreateReviewDto, user: UserInterface): Promise<{
        review: {
            id: number;
            rating: number;
            userId: number;
            productId: number;
            comment: string;
        };
    }>;
    getAllReviews(query: ReviewQueryDto): Promise<{
        reviews: ({} & {
            id: number;
            rating: number;
            userId: number;
            productId: number;
            comment: string;
        })[];
    }>;
    getReview(id: number): Promise<{
        review: {
            user: {
                id: number;
                name: string;
                email: string;
                password: string;
                image: string;
                role: import(".prisma/client").$Enums.UserType;
                passwordChangedAt: Date;
                passwordResetCode: string;
                passwordResetCodeExpiresIn: Date;
            };
        };
    }>;
    deleteReview(id: number, user: UserInterface): Promise<{
        review: {
            id: number;
            rating: number;
            userId: number;
            productId: number;
            comment: string;
        };
    }>;
    updateRrview(id: number, body: UpdateReviewDto, user: UserInterface): Promise<{
        review: {
            user: {
                id: number;
                name: string;
                email: string;
                password: string;
                image: string;
                role: import(".prisma/client").$Enums.UserType;
                passwordChangedAt: Date;
                passwordResetCode: string;
                passwordResetCodeExpiresIn: Date;
            };
        } & {
            id: number;
            rating: number;
            userId: number;
            productId: number;
            comment: string;
        };
    }>;
    private aggregation;
}
