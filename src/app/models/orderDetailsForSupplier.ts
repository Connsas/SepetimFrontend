import { AddressToShow } from "./addressToShow";
import { Product } from "./product";

export interface OrderDetailsForSupplier{
    orderId:number;
    userFirstName:string;
    userLastName:string;
    product:Product;
    supplierId:number;
    address:AddressToShow;
    quantity:number;
    productPrice:number;
    orderDate:Date;
}