import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css',
})
export class NaviComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private localeStorageService: LocaleStorageService,
    private toast: ToastrService
  ) {}

  loginForm: FormGroup;
  userType: string;
  isRememberCheck: boolean;
  userName: string = this.localeStorageService.getFromLocalStorage('userName');
  userSurname: string = this.localeStorageService.getFromLocalStorage('userSurname');
  userToDisplay: string =  this.userName + ' ' + this.userSurname;

  ngOnInit(): void {
    this.createLoginForm();
    this.checkUserType();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.localeStorageService.addToLocalStorage(
            'token',
            response.data.token
          );
          this.localeStorageService.addToLocalStorage(
            'tokenExpiration',
            response.data.expiration
          );
          this.localeStorageService.addToLocalStorage(
            'userId',
            response.userId.toString()
          );
          this.localeStorageService.addToLocalStorage(
            'userName',
            response.userName
          );
          this.localeStorageService.addToLocalStorage(
            'userSurname',
            response.userSurname
          );
          this.authService
            .isIndividualUserType(response.userId)
            .subscribe((response) => {
              if (response) {
                this.localeStorageService.addToLocalStorage(
                  'userType',
                  'individual'
                );
              } else {
                this.localeStorageService.addToLocalStorage(
                  'userType',
                  'corporate'
                );
              }
            });

          this.checkUserType();
          this.userSurname =
            this.localeStorageService.getFromLocalStorage('userSurname');
          this.userName =
            this.localeStorageService.getFromLocalStorage('userName');
          this.userToDisplay = this.userName + ' ' + this.userSurname;
          window.location.reload();
          this.toast.success('Giriş İşlemi Başarılı');
        },
        (responseError) => {
          console.log(responseError);
          if (responseError.message == 'Email or password is incorrect.') {
            this.toast.error('Kullanıcı adı veya şifre yanlış.');
          } else {
            this.toast.error('Kullanıcı bulunamadı.');
          }
        }
      );
    }
  }

  logout() {
    this.localeStorageService.clearLocaleStorage();
    this.ngOnInit();
  }

  isLoggedIn() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  checkUserType() {
    this.userType = this.localeStorageService.getFromLocalStorage('userType');
  }
  
}
