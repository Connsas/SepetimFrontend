import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteToShow } from '../../models/favoriteToShow';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CartToShow } from '../../models/cartToShow';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  constructor(
    private favoriteService: FavoriteService,
    private localStorageService: LocaleStorageService,
    private toastService: ToastrService,
    private authService:AuthService,
    private cartService:CartService,
    
  ) {}

  favoriteItems: FavoriteToShow[];
  userId:number = this.localStorageService.getUserId();

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favoriteService.getFavorites(this.userId).subscribe((response) => {
      this.favoriteItems = response.data;
    });
  }

  deleteFavorite(favoriteId:number) {
    this.favoriteService.deleteFavorite({favoriteId:favoriteId, userId:this.userId, productId:0, addDate:new Date}).subscribe((response) =>{
      this.toastService.info("Ürün Favorilerden Silindi.");
      this.ngOnInit();
    });
  }

  addToCart(productId: number) {
    var userId = this.localStorageService.getUserId();
    if (this.authService.isAuthenticated()) {
      var cartItemToCheck: CartToShow;
      this.cartService.getCartItems(userId).subscribe((response) => {
        for (let item of response.data) {
          if (item.product.productId == productId) {
            cartItemToCheck = item;
          }
        }
        if (cartItemToCheck == null) {
          this.cartService
            .addToCart({ userId, productId, quantity: 1 })
            .subscribe((response) => {
              this.toastService.success('Ürün Başarıyla Sepete Eklendi');
            });
        } else {
          this.cartService
            .updateCart({
              cartId: cartItemToCheck.cartId,
              productId: cartItemToCheck.product.productId,
              quantity: cartItemToCheck.quantity+1,
              userId,
            })
            .subscribe((response) => {
              this.toastService.success('Ürün Başarıyla Sepete Eklendi');
            });
        }
      });
    } else {
      this.toastService.info('Sepete Ürün Eklemek İçin Giriş Yapmalısınız');
    }
  }
}
