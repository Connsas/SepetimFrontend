import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderModel } from '../models/orderModel';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  private apiUrl:string = "https://localhost:44303/api/Order/";

  add(order:OrderModel){
    let currentUrl:string = this.apiUrl + "add";
    return this.http.post<ResponseModel>(currentUrl, order);
  }

  getForClient(userId:number):Observable<ListResponseModel<OrderModel>>{
    let currentUrl:string = this.apiUrl + "getforclient" + userId;
    return this.http.get<ListResponseModel<OrderModel>>(currentUrl);
  }

  getForSupplier(supplierId:number):Observable<ListResponseModel<OrderModel>>{
    let currentUrl:string = this.apiUrl + "getforsupplier" + supplierId;
    return this.http.get<ListResponseModel<OrderModel>>(currentUrl);
  }
}
