import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoryComponent } from './components/category/category.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { loginGuard } from './guards/login.guard';
import { ProductAddComponent } from './components/product-add/product-add.component';

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
    children:[
      {
        path:'products',
        component:CategoryComponent
      },
      {
        path:'products',
        component:ProductsComponent
      }
    ]
  },
  {
    path: 'products/category/:categoryId',
    component: HomepageComponent,
    children:[
      {
        path:'products/category/:categoryId',
        component:CategoryComponent
      },
      {
        path:'products/category/:categoryId',
        component:ProductsComponent
      }
    ]
  },
  {
    path: 'products/product',
    component: ProductPageComponent,
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'cart', component: CartComponent, canActivate: [loginGuard]},
  { path: 'favorite', component: FavoritesComponent, canActivate: [loginGuard]},
  { path: 'products/:productId', component: ProductPageComponent},
  { path: 'product/product-add', component: ProductAddComponent},
];
