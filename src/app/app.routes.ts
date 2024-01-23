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
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CardComponent } from './components/card/card.component';
import { AddressComponent } from './components/address/address.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Ana Sayfa - Sepetim',
    component: HomepageComponent,
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
    path: 'products/product',
    component: ProductPageComponent,
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'cart', component: CartComponent, canActivate: [loginGuard] },
  {
    path: 'favorite',
    component: FavoritesComponent,
    canActivate: [loginGuard],
  },
  { path: 'products/:productId', component: ProductPageComponent },
  { path: 'product/product-add', component: ProductAddComponent, canActivate: [loginGuard]},
  { path: 'account', component: UserInfoComponent, canActivate: [loginGuard]},
  { path: 'account/registerCard', component: CardComponent, canActivate: [loginGuard]},
  { path: 'account/addressAdd', component: AddressComponent, canActivate: [loginGuard]}
];
