import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    {path:"",pathMatch:"full", component:ProductsComponent},
    {path:"products", component:ProductsComponent},
    {path:"products/category/:categoryId", component:ProductsComponent},
];
