import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressToAdd } from '../models/addressToAdd';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { AddressToShow } from '../models/addressToShow';
import { AddressToDelete } from '../models/addressToDelete';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }

  private apiUrl:string = "https://localhost:44303/api/address/";

  add(addressToAdd: AddressToAdd){
    let currentPath:string = this.apiUrl + "add";
    return this.http.post<ResponseModel>(currentPath, addressToAdd);
  }

  get(userId:number):Observable<ListResponseModel<AddressToShow>>{
    let currentPath = this.apiUrl + "getbyuserid?userId=" + userId;
    return this.http.get<ListResponseModel<AddressToShow>>(currentPath);
  }

  delete(addressToDelete: AddressToDelete){
    let currentPath = this.apiUrl + "delete";
    return this.http.post<ResponseModel>(currentPath, addressToDelete);
  }
}
