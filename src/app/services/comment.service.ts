import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { commentAddModel } from '../models/commentAddModel';
import { CommentDeleteModel } from '../models/commentDeleteModel';
import { ResponseModel } from '../models/responseModel';
import { Comment } from '../models/commentModel';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://localhost:44303/api/Comment/';

  getComments(productId: number): Observable<ListResponseModel<Comment>> {
    let currentUrl: string =
      this.apiUrl + 'getbyproductid?productId=' + productId;
    return this.http.get<ListResponseModel<Comment>>(currentUrl);
  }

  addComment(commentAddModel: commentAddModel) {
    let currentUrl: string = this.apiUrl + 'add';
    return this.http.post<ResponseModel>(currentUrl, commentAddModel);
  }

  deleteComment(commentDeleteModel: CommentDeleteModel) {
    let currentUrl: string = this.apiUrl + 'delete';
    return this.http.post<ResponseModel>(currentUrl, commentDeleteModel);
  }
}
