import { FileHandle } from "./file-handle.model";

export interface ProductStock{
    id: any,
    amountInStock: number,
    imageFiles: FileHandle[]
    color:  string,
    productClassId: any
}