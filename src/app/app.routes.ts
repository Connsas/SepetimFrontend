import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoryComponent } from './components/category/category.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    title: 'Ana Sayfa - Sepetim',
    component: HomepageComponent,
    children:[
      {
        path:'',
        component:CategoryComponent
      },
      {
        path:'',
        component:ProductsComponent
      }
    ]
  },
  {
    path: 'products',
    component: HomepageComponent,
  },
  {
    path: 'products/category/:categoryId',
    component: HomepageComponent,
  },
  {
    path: 'products/:productName',
    component: ProductPageComponent,
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'cart', component: CartComponent },
  { path: 'favorite', component: FavoritesComponent },
];
