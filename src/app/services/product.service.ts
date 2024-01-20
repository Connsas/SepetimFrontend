import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ProductAddModel } from '../models/productAddModel';
import { ResponseModel } from '../models/responseModel';
import { NumberRequest } from '../models/numberRequest';
import { ProductWithImages } from '../models/productWithImage';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'https://localhost:44303/api/Product/';

  getProducts(): Observable<ListResponseModel<Product>> {
    let currentUrl: string = this.apiUrl + 'getall';
    return this.http.get<ListResponseModel<Product>>(currentUrl);
  }

  getProductsWithImage(): Observable<ListResponseModel<ProductWithImages>>{
    let currentUrl: string = this.apiUrl + 'getallwithimages';
    return this.http.get<ListResponseModel<ProductWithImages>>(currentUrl);
  }

  getProductsByCategory(categoryId: number): Observable<ListResponseModel<Product>> {
    let currentUrl: string =
    this.apiUrl + 'getbycategory?categoryId=' + categoryId;
    return this.http.get<ListResponseModel<ProductWithImages>>(currentUrl);
  }

  getProductById(productId: number): Observable<SingleResponseModel<Product>> {
    let currentUrl: string =
      this.apiUrl + 'getbyproductid?productId=' + productId;
    return this.http.get<SingleResponseModel<Product>>(currentUrl);
  }

  add(productAddModel: ProductAddModel, supplierId: NumberRequest) {
    let currentUrl: string = this.apiUrl + 'add';
    let product: Product = {
      categoryId: productAddModel.categoryId,
      description: productAddModel.description,
      price: productAddModel.productPrice,
      productName: productAddModel.productName,
      stockAmount: productAddModel.stockAmount,
      productId: 0,
      supplierId: supplierId.userId,
    };
    return this.http.post<number>(currentUrl, product);
  }
}
