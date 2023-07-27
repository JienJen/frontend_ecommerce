import { FileHandle } from "./file-handle.model";

export interface Product{
    "name": string,
    "description":  string,
    "amountInStock": number,
    "price": number,
    "imageFiles": FileHandle[]
}