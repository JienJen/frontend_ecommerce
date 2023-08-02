import { cartItems } from "./cartItems.model";
import { Product } from "./product.model";

export interface MyOrderDetails {
    orderId : number;
    firstName : string;
    userAddress : string;
    userPhoneNumber : number;
    totalPrice: number;
    product: Product;
    cartItems: cartItems[];
}