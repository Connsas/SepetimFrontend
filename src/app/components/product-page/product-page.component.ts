import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductImageService } from '../../services/product-image.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';
import { ToastrService } from 'ngx-toastr';
import { CartToShow } from '../../models/cartToShow';
import { FavoriteToShow } from '../../models/favoriteToShow';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { CommentService } from '../../services/comment.service';
import { commentAddModel } from '../../models/commentAddModel';
import { CommentForShow } from '../../models/commentForShow';
import { Comment } from '../../models/commentModel';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private productImageService: ProductImageService,
    private cartService: CartService,
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private toastService: ToastrService,
    private localStorageService: LocaleStorageService,
    private commentService: CommentService
  ) {}

  productDetails: Product = {
    categoryId: 0,
    description: '',
    price: 0,
    productId: 0,
    productName: '',
    stockAmount: 0,
    supplierId: 0,
  };
  productImages: string[];
  imageSrc: string = '';
  userId: number = this.localStorageService.getUserId();
  userName: string = this.localStorageService.getFromLocalStorage('userName');
  userSurname: string =
    this.localStorageService.getFromLocalStorage('userSurname');
  isFavorited: boolean = false;
  comments: CommentForShow[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getProductDetails(params['productId']);
      this.getProductImagesById(params['productId']);
      this.getCommentsByProductId(params['productId']);
    });
  }

  getProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe((response) => {
      this.productDetails = response.data;
    });
  }

  getProductImagesById(productId: number) {
    this.productImageService.get(productId).subscribe((response) => {
      this.productImages = response.data;
      if (response.message == 'Resim Bulunamadı') {
        this.imageSrc =
          '../../../assets/images/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';
      } else {
        this.imageSrc = 'data:image/png;base64,' + this.productImages[0];
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
          this.isFavorited = true;
        } else {
          this.isFavorited = false;
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

  getCommentsByProductId(productId: number) {
    this.commentService.getComments(productId).subscribe((response) => {
      console.log(response);
      this.comments = response.data;
    });
  }

  addComment(input: HTMLTextAreaElement) {
    let commentText: string = input.value.toString();
    console.log(commentText);
    let commentAddModel: commentAddModel = {
      commentText: commentText,
      productId: this.productDetails.productId,
      userId: this.userId,
    };
    this.commentService.addComment(commentAddModel).subscribe((response) => {
      if (response.success) {
        this.toastService.success('Yorumunuz başarıyla gönderildi.');
      } else {
        this.toastService.error('Yorum gönderilirken sorun oluştu.');
      }
    });
  }

  deleteComment(commentId: number) {
    var date = new Date();
    var commentDeleteModel: Comment = {
      commentId: commentId,
      commentText: '',
      productId: 0,
      sendDate: date,
      userId: 0,
    };
    console.log(commentDeleteModel);
    this.commentService
      .deleteComment(commentDeleteModel)
      .subscribe((response) => {
        if (response.success) {
          this.toastService.success('Yorumunuz başarıyla silindi.');
          this.ngOnInit();
        } else {
          this.toastService.error('Yorumunuz silinemedi.');
        }
      });
  }
}
