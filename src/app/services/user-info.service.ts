import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserInfoModel } from '../models/userInfoModel';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http:HttpClient) { }

  apiUrl:string = "https://localhost:44303/api/UserAccount/";

  get(userId:number):Observable<SingleResponseModel<UserInfoModel>>{
    let currentUrl:string = this.apiUrl + "get?id=" + userId;
    return this.http.get<SingleResponseModel<UserInfoModel>>(currentUrl);
  }
}
