import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartToShow } from '../../models/cartToShow';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductImagesModel } from '../../models/productImagesModel';
import { ProductImageService } from '../../services/product-image.service';

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
    private toastrService: ToastrService,
    private productImageService: ProductImageService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  cartItems: CartToShow[] = [];
  totalAmount: number = 0;
  cartLenght: number;
  productImages: ProductImagesModel[] = [];

  getCart() {
    var userId = this.localStorageService.getUserId();
    this.cartService.getCartItems(userId).subscribe((response) => {
      this.totalAmount = 0;
      this.cartItems = response.data;
      this.cartLenght = response.data.length;
      for (let cart of this.cartItems) {
        this.totalAmount += cart.product.price * cart.quantity;
      }
      this.getImages();
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

  getProductImageById(productId: number): string {
    for (var image of this.productImages) {
      if (image.productId == productId) {
        return image.image;
      }
    }
    return '';
  }

  getImages() {
    var productImage: ProductImagesModel;
    for (var item of this.cartItems) {
      var image: string;
      this.productImageService
        .getWithProductId(item.product.productId)
        .subscribe((secondeResponse) => {
          if (secondeResponse.data[0].image == 'null') {
            image =
              '../../../assets/images/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';
          } else {
            image = 'data:image/png;base64,' + secondeResponse.data[0].image;
          }
          productImage = {
            productId: secondeResponse.data[0].productId,
            image: image,
          };
          this.productImages.push(productImage);
        });
    }
  }
}
