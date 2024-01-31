import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { AddressService } from '../../services/address.service';
import { CardToShow } from '../../models/cardToShow';
import { AddressToShow } from '../../models/addressToShow';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartToShow } from '../../models/cartToShow';
import { CartService } from '../../services/cart.service';
import { OrderModel } from '../../models/orderModel';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { ProductImagesModel } from '../../models/productImagesModel';
import { ProductImageService } from '../../services/product-image.service';

@Component({
  selector: 'app-order-product',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.css',
})
export class OrderProductComponent implements OnInit {
  constructor(
    private cardService: CardService,
    private addressService: AddressService,
    private localStorageService: LocaleStorageService,
    private cartService: CartService,
    private orderService: OrderService,
    private toast: ToastrService,
    private productImageService: ProductImageService
  ) {}

  cards: CardToShow[];
  addresses: AddressToShow[];
  cartItems: CartToShow[] = [];
  userId: number = this.localStorageService.getUserId();
  currentAddress: AddressToShow;
  currentCard: CardToShow;
  totalCost: number = 0;
  productImages:ProductImagesModel[] = [];


  ngOnInit(): void {
    this.getCards();
    this.getAddresses();
    this.getCartItems();
  }

  getCards() {
    this.cardService.get(this.userId).subscribe((response) => {
      this.cards = response.data;
    });
  }

  getAddresses() {
    this.addressService.get(this.userId).subscribe((response) => {
      this.addresses = response.data;
    });
  }

  getCartItems() {
    this.cartService.getCartItems(this.userId).subscribe((response) => {
      this.cartItems = response.data;
      for (let item of response.data) {
        this.totalCost = this.totalCost + item.quantity * item.product.price;
      }
      this.getImages();
    });
  }

  getCurrentCard(card: CardToShow) {
    this.currentCard = card;
  }

  getCurrentAddress(address: AddressToShow) {
    this.currentAddress = address;
  }

  setOrder() {
    let date: Date = new Date();
    if (this.currentAddress != null && this.currentCard != null) {
      for (let item of this.cartItems) {
        let order: OrderModel = {
          orderId: 0,
          addressId: this.currentAddress.addressId,
          productId: item.product.productId,
          productPrice: item.product.price * item.quantity,
          userId: this.userId,
          supplierId: item.product.supplierId,
          orderDate: date,
          quantity: item.quantity
        };
        this.orderService.add(order).subscribe((response) => {
        });
      }
      this.toast.success('Siparşiniz başarıyla oluşturuldu.');
    }else{
      this.toast.info("Kartınızı ve adresinizi seçmeden işlem yapamassınız.")
    }
  }

  getProductImageById(productId: number): string {
    for (var image of this.productImages) {
      if (image.productId == productId) {
        return image.image;
      }
    }
    return '';
  }

  getImages(){
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
