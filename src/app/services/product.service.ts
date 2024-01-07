import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  apiUrl:string = "https://localhost:44303/api/Product/";

  getProducts(): Observable<ListResponseModel<Product>>{
    let currentUrl:string = this.apiUrl + "getall";
    return this.http.get<ListResponseModel<Product>>(currentUrl);
  }

  getProductsByCategory(categoryId: number): Observable<ListResponseModel<Product>>{
    let currentUrl:string = this.apiUrl + "getbycategory?categoryId=" + categoryId;
    return this.http.get<ListResponseModel<Product>>(currentUrl);
  }
}