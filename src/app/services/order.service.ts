import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderModel } from '../models/orderModel';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { OrderModelForShow } from '../models/orderModelForShow';
import { OrderDetailsForSupplier } from '../models/orderDetailsForSupplier';

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

  getForClient(userId:number):Observable<ListResponseModel<OrderModelForShow>>{
    let currentUrl:string = this.apiUrl + "getforclient?userId=" + userId;
    return this.http.get<ListResponseModel<OrderModelForShow>>(currentUrl);
  }

  getForSupplier(supplierId:number):Observable<ListResponseModel<OrderDetailsForSupplier>>{
    let currentUrl:string = this.apiUrl + "getforsupplier?supplierId=" + supplierId;
    return this.http.get<ListResponseModel<OrderDetailsForSupplier>>(currentUrl);
  }
}
