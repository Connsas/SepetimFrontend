import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductImageService } from '../../services/product-image.service';
import { ProductImage } from '../../models/productImageModel';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
  
  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute, private productImageService:ProductImageService){}

  productDetails:Product = {categoryId:0, description:"", price:0, productId:0, productName:"", stockAmount:0, supplierId:0};
  productImages:string[]
  imageSrc:string = "";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
      this.getProductDetails(params['productId']);
      this.getProductImagesById(params['productId']);
    })
  }

  getProductDetails(productId:number){
    this.productService.getProductById(productId).subscribe((response) =>{
      this.productDetails = response.data;
    })
  }

  getProductImagesById(productId:number){
    this.productImageService.get(productId).subscribe((response) => {
      this.productImages = response.data;
      if(response.message == "Resim Bulunamadı"){
        this.imageSrc = "../../../assets/images/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
      }else{
        this.imageSrc = "data:image/png;base64," + this.productImages[0];
      }
    })
  }
}
