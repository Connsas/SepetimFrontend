import { Product } from "./product";

export interface FavoriteToShow{
    favoriteId:number;
    userId:number;
    product:Product;
    addDate:Date;
}