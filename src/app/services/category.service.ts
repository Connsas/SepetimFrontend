import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Category } from '../models/category';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = 'https://localhost:44303/api/Category/';

  constructor(private http:HttpClient) { }

  getCategories(): Observable<ListResponseModel<Category>>{
    var currentUrl:string = this.apiUrl + "getall";
    return this.http.get<ListResponseModel<Category>>(currentUrl);
  }
}
