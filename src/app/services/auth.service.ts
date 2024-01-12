import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualModel } from '../models/registerIndividualModel';
import { CorporateModel } from '../models/registerCorporateModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private apiUrl:string = "https://localhost:44303/api/auth/";

  signUpIndividual(individualModel:IndividualModel){
    let newPath:string = this.apiUrl + "registerindividual";
    console.log(individualModel)
    return this.http.post<SingleResponseModel<TokenModel>>(newPath, individualModel);
  }

  signUpCorporate(corporateModel:CorporateModel){
    let newPath:string = this.apiUrl + "registercorporate";
    return this.http.post<SingleResponseModel<TokenModel>>(newPath, corporateModel);
  }
}
