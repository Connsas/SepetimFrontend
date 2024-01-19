import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartToShow } from '../../models/cartToShow';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private localStorageService: LocaleStorageService,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  cartItems: CartToShow[];
  totalAmount: number = 0;
  cartLenght: number;

  getCart() {
    var userId = this.localStorageService.getUserId();
    this.cartService.getCartItems(userId).subscribe((response) => {
      this.cartItems = response.data;
      this.cartLenght = response.data.length;
    });
  }

  updateCart(cartId: number, productId: number, quantity: number) {
    var userId = this.localStorageService.getUserId();

    this.cartService
      .updateCart({ cartId, userId, productId, quantity })
      .subscribe((response) => {
        this.toastrService.success('Sepetiniz güncellendi');
        this.ngOnInit();
      });
  }

  deleteCartItem(cartId: number) {
    this.cartService
      .removeFromCart({ cartId, productId: 0, quantity: 0, userId: 0 })
      .subscribe((response) => {
        this.toastrService.info('Ürün Sepetinizden Başarıyla Silindi');
        this.ngOnInit();
      });
  }

  clearAllCart() {
    var userId = this.localStorageService.getUserId();
    this.cartService.clearAllCartItems(userId).subscribe((response) => {
      console.log(response);
      this.toastrService.info('Sepetiniz Temizlendi');
      this.ngOnInit();
    });
  }
}
