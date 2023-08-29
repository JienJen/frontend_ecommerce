import { FileHandle } from "./file-handle.model";
import { Product } from "./product.model";

export interface ClassProduct{
    productClassId: any,
    name: string,
    imageFiles: FileHandle[],
    description:  string,
    category:  string,
    products: Product[],
    price: number
}