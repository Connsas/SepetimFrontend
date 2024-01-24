import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardToShow } from '../models/cardToShow';
import { ResponseModel } from '../models/responseModel';
import { CardToDelete } from '../models/cardToDelete';
import { ListResponseModel } from '../models/listResponseModel';
import { CardToAdd } from '../models/cardToAdd';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http:HttpClient) { }

  private apiUrl:string = "https://localhost:44303/api/registeredcard/";

  get(userId:number):Observable<ListResponseModel<CardToShow>>{
    let currentPath:string = this.apiUrl + "getbyuserid?userId=" + userId;
    return this.http.get<ListResponseModel<CardToShow>>(currentPath);
  }

  add(cardToAdd:CardToAdd){
    let currentPath:string = this.apiUrl + "add";
    return this.http.post<ResponseModel>(currentPath, cardToAdd);
  }

  delete(card:number){
    let cardId:CardToDelete = {cardId:card};
    let currentPath:string = this.apiUrl + "delete";
    return this.http.post<ResponseModel>(currentPath, cardId);
  }
}
