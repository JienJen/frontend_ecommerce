import { cartItems } from "./cartItems.model";
import { Product } from "./product.model";

export interface AllOrderDetails {
    orderId : number;
    userId: number;
    firstName : string;
    userAddress : string;
    userPhoneNumber : number;
    totalPrice: number;
    product: Product;
    cartItems: cartItems[];
}