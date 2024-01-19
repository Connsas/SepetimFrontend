import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { FavoriteToShow } from '../models/favoriteToShow';
import { FavoriteToAdd } from '../models/favoriteToAdd';
import { ResponseModel } from '../models/responseModel';
import { FavoriteToDelete } from '../models/favoriteToDelete';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http:HttpClient) { }

  private apiUrl:string = "https://localhost:44303/api/Favorite/"

  getFavorites(userId:number):Observable<ListResponseModel<FavoriteToShow>>{
    let newPath:string = this.apiUrl + "getbyuserid?userId=" + userId;
    return this.http.get<ListResponseModel<FavoriteToShow>>(newPath);
  }

  addFavorite(favoriteModel:FavoriteToAdd){
    let newPath:string = this.apiUrl + "add";
    return this.http.post<ResponseModel>(newPath, favoriteModel);
  }

  deleteFavorite(favoriteModel:FavoriteToDelete){
    let newPath:string = this.apiUrl + "delete";
    return this.http.post<ResponseModel>(newPath, favoriteModel);
  }

  checkIfInFavorite(userId:number, productId:number):Observable<ResponseModel>{
    let newPath:string = this.apiUrl + "checkifinfavorite?userId=" + userId + "&" + "productId=" + productId;
    return this.http.get<ResponseModel>(newPath); 
  }
}
