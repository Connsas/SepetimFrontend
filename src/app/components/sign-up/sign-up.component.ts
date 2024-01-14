import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localeStorageService: LocaleStorageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createIndividualSignUpForm()
    this.createCorporateSignUpForm()
  }

  signUpIndividualForm: FormGroup;
  signUpCorporateForm: FormGroup;
  private currentUserForm: string = 'individual';

  createIndividualSignUpForm() {
    this.signUpIndividualForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      nationalityId: ['', Validators.required],
    });
  }

  createCorporateSignUpForm() {
    this.signUpCorporateForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      corporateName: ['', Validators.required],
      taxNumber: ['', Validators.required],
    });
  }

  registerIndividual() {
    if (this.signUpIndividualForm.valid) {
      let individualModel = Object.assign({}, this.signUpIndividualForm.value);
      this.authService.signUpIndividual(individualModel).subscribe(
        (response) => {
          this.localeStorageService.addToLocalStorage(
            'token',
            response.data.token
          );
          this.toastrService.success("Bireysel Hesap Oluşturma Başarılı");
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    }
  }

  registerCorporate() {
    if (this.signUpCorporateForm.valid) {
      let corporateModel = Object.assign({}, this.signUpCorporateForm.value);
      this.authService.signUpCorporate(corporateModel).subscribe(
        (response) => {
          this.localeStorageService.addToLocalStorage(
            'token',
            response.data.token
          );
          this.toastrService.success("Satıcı Hesabı Oluşturma Başarılı");
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    }
  }

  setCurrentUserForm(form: string) {
    this.currentUserForm = form;
  }

  individualButton(){
    this.createIndividualSignUpForm
    this.currentUserForm = "individual"
  }

  corporateButton(){
    this.createCorporateSignUpForm
    this.currentUserForm = "corporate"
  }

  getCurrentUserForm() {
    return this.currentUserForm;
  }

  setUserFormButtonActive(form: string) {
    if (this.currentUserForm === form) {
      return 'btn btn-primary active';
    } else {
      return 'btn btn-primary';
    }
  }
}
