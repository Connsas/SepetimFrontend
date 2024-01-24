import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageServiceService {

  constructor() { }

  addToSessionStorage(Key:string, Value:string){
    sessionStorage.setItem(Key, Value)
  }
}
