import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { ProductImageAddModel } from '../models/productImageAddModel';
import { ProductIdNumber } from '../models/productIdNumber';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProductImage } from '../models/productImageModel';
import { ImageWithProductIdModel } from '../models/imageWithProductIdModel';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(private http:HttpClient) { }

  apiUrl:string = "https://localhost:44303/api/ProductImage/"; 

  add(file:File, productId:ProductIdNumber){
    // var request:ProductImageAddModel = {productId:productId, productImage:file};
    var newPath:string = this.apiUrl + "add";
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const formData = new FormData();
    formData.append("productImage", file);
    formData.append("productId", productId.productId.toString());
    return this.http.post<ResponseModel>(newPath, formData, {headers:headers});
  }

  delete(imageId:number){
    var newPath:string = this.apiUrl + "delete";
    return this.http.post<ResponseModel>(newPath, imageId);
  }

  get(productId:number):Observable<ListResponseModel<string>>{
    var newPath:string = this.apiUrl + "getbyproductid?productId=" + productId;
    return this.http.get<ListResponseModel<string>>(newPath);
  }

  getWithProductId(productId:number):Observable<ListResponseModel<ImageWithProductIdModel>>{
    var newPath:string = this.apiUrl + "getbyproductidwithproductid?productId=" + productId;
    return this.http.get<ListResponseModel<ImageWithProductIdModel>>(newPath);
  }
}
