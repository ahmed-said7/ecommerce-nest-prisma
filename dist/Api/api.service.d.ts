interface Q {
    select?: string;
    sort?: string;
    keyword?: string;
    limit?: number;
    page?: number;
}
export declare class ApiService<T extends Q> {
    queryInclude: {
        [k: string]: boolean;
    };
    obj: {
        where: {};
        orderBy: any[];
        select: {};
        include: {};
        skip: number;
        take: number;
    };
    query: T;
    filter(q: T): this;
    select(): this;
    sort(): this;
    pagination(): this;
    include(query?: {
        [k: string]: boolean;
    }): this;
}
export {};
