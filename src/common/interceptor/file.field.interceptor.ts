import { HttpException } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

export const fieldsInterceptor=(field1:string,field2:string)=>FileFieldsInterceptor(
    [
        {name:field1,maxCount:8},{name:field2,maxCount:1}
    ]
    ,{
        storage:memoryStorage(),
        fileFilter(req, file, callback) {
            if( !file.mimetype.startsWith("image") ){
                return callback(new HttpException("file type should be image",400)
                ,false);
            };
            return callback(null,true);
        }
    }
)