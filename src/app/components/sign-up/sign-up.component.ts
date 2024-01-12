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
export class SignUpComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localeStorageService: LocaleStorageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createIndividualSignUpForm();
  }

  signUpIndividualForm: FormGroup;
  private checkedRatioButton: string = 'individual';

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

  registerIndividual() {
    if (this.signUpIndividualForm.valid) {
      let individualModel = Object.assign({}, this.signUpIndividualForm.value);
      this.authService.signUpIndividual(individualModel).subscribe(
        (response) => {
          this.localeStorageService.addToLocalStorage(
            'token',
            response.data.token
          );
          this.toastrService.success(response.message);
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    }
  }
}
