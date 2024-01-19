import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartToShow } from '../models/cartToShow';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CartToAdd } from '../models/cartToAdd';
import { CartToUpdate } from '../models/cartToUpdate';
import { NumberRequest } from '../models/numberRequest';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://localhost:44303/api/Cart/';

  getCartItems(userId: number): Observable<ListResponseModel<CartToShow>> {
    let newPath = this.apiUrl + 'getbyuserid?id=' + userId;
    return this.http.get<ListResponseModel<CartToShow>>(newPath);
  }

  addToCart(cartModel: CartToAdd) {
    let newPath = this.apiUrl + 'add';
    return this.http.post<ResponseModel>(newPath, cartModel);
  }

  removeFromCart(cartModel: CartToUpdate) {
    let newPath = this.apiUrl + 'delete';
    return this.http.post<ResponseModel>(newPath, cartModel);
  }

  updateCart(cartModel: CartToUpdate) {
    let newPath = this.apiUrl + 'update';
    return this.http.post<ResponseModel>(newPath, cartModel);
  }

  clearAllCartItems(userId: number) {
    let newPath = this.apiUrl + 'deleteall';
    var request:NumberRequest = {userId}
    return this.http.post<ResponseModel>(newPath, request);
  }
}
