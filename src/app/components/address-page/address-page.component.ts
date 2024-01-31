import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { AddressToShow } from '../../models/addressToShow';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './address-page.component.html',
  styleUrl: './address-page.component.css',
})
export class AddressPageComponent implements OnInit {
  constructor(
    private addressService: AddressService,
    private localStorageService: LocaleStorageService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  addresses: AddressToShow[] = [];
  userId: number = this.localStorageService.getUserId();

  get() {
    this.addressService.get(this.userId).subscribe((response) => {
      this.addresses = response.data;
    });
  }

  delete(adressId: number) {
    this.addressService.delete(adressId).subscribe(
      (response) => {
        this.toastService.success('Adres Başarıyla Silindi');
        this.ngOnInit();
      },
      (responseError) => {
        this.toastService.error('Bir Hata Meydana Geldi');
      }
    );
  }
}
