import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { VatAddedPipe } from '../../pipes/vat-added.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { AuthService } from '../../services/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { CartToShow } from '../../models/cartToShow';
import { FavoriteService } from '../../services/favorite.service';
import { ProductWithFavorite } from '../../models/ProductWithFavorite';
import { FavoriteToShow } from '../../models/favoriteToShow';
import { ProductImageService } from '../../services/product-image.service';
import { ProductImage } from '../../models/productImageModel';
import { ProductWithImages } from '../../models/productWithImage';
import { ProductImagesModel } from '../../models/productImagesModel';
import { ImageWithProductIdModel } from '../../models/imageWithProductIdModel';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, VatAddedPipe, FilterPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productsWithFavorite: ProductWithFavorite[];
  filterText: string = '';
  isInFavorite: boolean = false;
  userId: number = this.localStorageService.getUserId();
  checkFavorite: boolean = false;
  productImages: ImageWithProductIdModel[] = [];
  imageSrc: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private localStorageService: LocaleStorageService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private toastService: ToastrService,
    private favoriteService: FavoriteService,
    private productImageService: ProductImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  addFavorite(productId: number) {
    var itemForCheck: FavoriteToShow;
    this.favoriteService
      .checkIfInFavorite(this.userId, productId)
      .subscribe((response) => {
        if (response.success) {
          this.toastService.info('Ürün Daha Önce Favorilere Eklenmiş.');
        } else {
          this.favoriteService
            .addFavorite({
              userId: this.userId,
              productId,
              addDate: new Date(),
            })
            .subscribe((response) => {
              this.toastService.success('Ürün Favorilere Eklendi.');
            });
        }
      });
  }

  deleteFavorite(favoriteId: number) {
    this.favoriteService
      .deleteFavorite({
        favoriteId: favoriteId,
        userId: this.userId,
        productId: 0,
        addDate: new Date(),
      })
      .subscribe((response) => {
        this.toastService.info('Ürün Favorilerden Silindi.');
      });
  }

  addToCart(productId: number) {
    if (this.authService.isAuthenticated()) {
      var cartItemToCheck: CartToShow;
      this.cartService.getCartItems(this.userId).subscribe((response) => {
        for (let item of response.data) {
          if (item.product.productId == productId) {
            cartItemToCheck = item;
          }
        }
        if (cartItemToCheck == null) {
          this.cartService
            .addToCart({ userId: this.userId, productId, quantity: 1 })
            .subscribe((response) => {
              this.toastService.success('Ürün Başarıyla Sepete Eklendi');
            });
        } else {
          this.cartService
            .updateCart({
              cartId: cartItemToCheck.cartId,
              productId: cartItemToCheck.product.productId,
              quantity: cartItemToCheck.quantity + 1,
              userId: this.userId,
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

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      var productImage: ProductImagesModel;
      this.getImages();
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

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.getImages();
      });
  }

  getImages(){
    var productImage: ProductImagesModel;
        for (var product of this.products) {
          var image: string;
          this.productImageService
            .getWithProductId(product.productId)
            .subscribe((secondeResponse) => {
              if (secondeResponse.data[0].image == 'null') {
                image =
                  '../../../assets/images/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';
              } else {
                image =
                  'data:image/png;base64,' + secondeResponse.data[0].image;
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
