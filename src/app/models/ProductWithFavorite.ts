import { Product } from "./product";

export interface ProductWithFavorite extends Product{
    isFavorited:boolean;
}