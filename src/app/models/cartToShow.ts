import { Product } from "./product";

export interface CartToShow{
    cartId:number
    userId:number;
    product:Product;
    quantity:number;
}