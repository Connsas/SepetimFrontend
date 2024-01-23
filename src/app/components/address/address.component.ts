import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddressToShow } from '../../models/addressToShow';
import { AddressService } from '../../services/address.service';
import { ToastrService } from 'ngx-toastr';
import { AddressToAdd } from '../../models/addressToAdd';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { AddressToDelete } from '../../models/addressToDelete';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private toastService: ToastrService,
    private localStorageService:LocaleStorageService
  ) {}
  
  ngOnInit(): void {
    this.createAddressAddForm();
  }

  addressAddForm: FormGroup;
  address: AddressToShow[] = [];
  userId:number = this.localStorageService.getUserId(); 

  createAddressAddForm() {
    this.addressAddForm = this.formBuilder.group({
      city: ['', Validators.required],
      district: ['', Validators.required],
      neighboorhood: ['', Validators.required],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
    });
  }

  add() {
    let addressToAdd:AddressToAdd = Object.assign({}, this.addressAddForm.value);
    addressToAdd.userId = this.userId;
    this.addressService.add(addressToAdd).subscribe((response) => {
      this.toastService.success("Adres Başarıyla Eklendi.");
    },(responseError) =>{
      console.log(responseError);
    })
  }

  // get(){
  //   this.addressService.get(this.userId).subscribe((response) => {
  //     this.address = response.data;
  //   })
  // }

  // delete(addressId:number){
  //   let addressToDelete:AddressToDelete = {addressId:addressId}
  //   this.addressService.delete(addressToDelete).subscribe((response) => {
  //     this.toastService.success("Adres Başarıyla Silindi.");
  //   });
  // }
}
