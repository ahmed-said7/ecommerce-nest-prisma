
export const validateQueryFunction=( { value } : {value:any} ) => {
    // console.log(value);
    if(typeof value == "string" ){
        return parseInt(value);
    } else {
        const obj={};
        const keys=Object.keys(value);
        keys.forEach( ( key ) => { obj[key] = parseInt(value[key]) } );
        console.log(obj);
        return obj;
    };
};

export const validateQueryDateFunction=( { value } : {value:any} ) => {
    // console.log(value);
    if(typeof value == "string" ){
        return new Date(value);
    } else {
        const obj={};
        const keys=Object.keys(value);
        keys.forEach( ( key ) => { obj[key] = new Date(value[key]) } );
        console.log(obj);
        return obj;
    };
};