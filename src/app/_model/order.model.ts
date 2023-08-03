import { cartItems } from "./cartItems.model";
import { Product } from "./product.model";

export interface MyOrderDetails {
    orderId : number;
    firstName : string;
    userAddress : string;
    orderDescription : string;
    orderStatus: string;
    userPhoneNumber : number;
    totalPrice: number;
    product: Product;
    cartItems: cartItems[];
}