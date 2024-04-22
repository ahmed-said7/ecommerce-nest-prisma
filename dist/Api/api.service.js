"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
;
let ApiService = class ApiService {
    constructor() {
        this.obj = { where: {}, orderBy: [], select: {}, include: {}, skip: 0, take: 10 };
    }
    filter(q) {
        this.query = q;
        const queryObj = { ...this.query };
        const fields = ['select', "sort", "keyword", "limit", "page"];
        fields.forEach(field => delete queryObj[field]);
        this.obj.where = queryObj;
        return this;
    }
    ;
    select() {
        if (this.query?.select) {
            this.query.select.split(",").
                forEach((field) => {
                console.log(field);
                this.obj.select[field] = true;
            });
        }
        else {
            delete this.obj.select;
        }
        ;
        return this;
    }
    ;
    sort() {
        if (this.query?.sort) {
            const sort = this.query.sort.split(",");
            this.obj.orderBy = sort.map((field) => {
                if (field.startsWith("-")) {
                    return { [field.slice(1)]: "desc" };
                }
                ;
                return { [field]: "asc" };
            });
        }
        else {
            delete this.obj.orderBy;
        }
        ;
        return this;
    }
    ;
    pagination() {
        const take = this.query?.limit || 10;
        const page = this.query?.page || 1;
        const skip = (page - 1) * take;
        this.obj.take = take;
        this.obj.skip = skip;
        return this;
    }
    ;
    include(query) {
        if (this.obj.select && query) {
            this.obj.select = { ...this.obj.select, ...query };
            delete this.obj.include;
        }
        else if (this.obj.include && query) {
            this.obj.include = query;
        }
        else {
            delete this.obj.include;
        }
        return this;
    }
    ;
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)()
], ApiService);
;
//# sourceMappingURL=api.service.js.map