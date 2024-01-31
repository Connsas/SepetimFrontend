
import { AddressToShow } from "./addressToShow";
import { Product } from "./product";

export interface OrderModelForShow{
    orderId:number;
    userId:number;
    product:Product;
    supplierId:number;
    address:AddressToShow;
    quantity:number;
    productPrice:number;
    orderDate:Date;
}