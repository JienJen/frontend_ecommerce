import { Product } from "./product.model";

export interface MyCartDetails {
    productId : number;
    productName : string;
    amount: number;
    price: number;
    status: string;
    product: Product;
    
}