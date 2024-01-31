import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ProductImageService } from '../../services/product-image.service';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { OrderModelForShow } from '../../models/orderModelForShow';
import { ProductImagesModel } from '../../models/productImagesModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-page-supplier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-page-supplier.component.html',
  styleUrl: './order-page-supplier.component.css',
})
export class OrderPageSupplierComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private productImageService: ProductImageService,
    private localStorageService: LocaleStorageService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  orders: OrderModelForShow[] = [];
  productImages: ProductImagesModel[] = [];
  userId: number = this.localStorageService.getUserId();

  getOrders() {
    this.orderService.getForSupplier(this.userId).subscribe((response) => {
      this.orders = response.data;
      console.log(this.orders);
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

  getImages() {
    var productImage: ProductImagesModel;
    for (var item of this.orders) {
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
