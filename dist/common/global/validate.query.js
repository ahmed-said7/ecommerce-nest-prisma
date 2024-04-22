"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryDateFunction = exports.validateQueryFunction = void 0;
const validateQueryFunction = ({ value }) => {
    if (typeof value == "string") {
        return parseInt(value);
    }
    else {
        const obj = {};
        const keys = Object.keys(value);
        keys.forEach((key) => { obj[key] = parseInt(value[key]); });
        console.log(obj);
        return obj;
    }
    ;
};
exports.validateQueryFunction = validateQueryFunction;
const validateQueryDateFunction = ({ value }) => {
    if (typeof value == "string") {
        return new Date(value);
    }
    else {
        const obj = {};
        const keys = Object.keys(value);
        keys.forEach((key) => { obj[key] = new Date(value[key]); });
        console.log(obj);
        return obj;
    }
    ;
};
exports.validateQueryDateFunction = validateQueryDateFunction;
//# sourceMappingURL=validate.query.js.map