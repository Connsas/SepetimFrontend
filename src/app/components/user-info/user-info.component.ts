import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { UserInfoModel } from '../../models/userInfoModel';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit{

  constructor(private userInfoService:UserInfoService, private localStorageService:LocaleStorageService){}

  ngOnInit(): void {
    this.get();
  }

  userId:number = this.localStorageService.getUserId();
  userName:string = this.localStorageService.getFromLocalStorage("userName");
  userSurname:string = this.localStorageService.getFromLocalStorage("userSurname");
  userFullName:string = this.userName + " " + this.userSurname
  userInfo:UserInfoModel;
  accountStatus:string = "Doğrulanmadı";

  get(){
    this.userInfoService.get(this.userId).subscribe((response) => {
      this.userInfo = response.data;
      if(response.data.isVerified){
        this.accountStatus = "Doğrulandı";
      }else{
        this.accountStatus = "Doğrulanmadı";
      }
    })
  }

}
