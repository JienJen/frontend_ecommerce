import { FileHandle } from "./file-handle.model";

export interface Product{
    id: any,
    amountInStock: number,
    imageFiles: FileHandle[]
    color:  string,
    productClassId: any
}