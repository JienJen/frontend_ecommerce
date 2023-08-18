import { FileHandle } from "./file-handle.model";

export interface Product{
    id: any,
    name: string,
    description:  string,
    category:  string,
    amountInStock: number,
    price: number,
    imageFiles: FileHandle[]
}