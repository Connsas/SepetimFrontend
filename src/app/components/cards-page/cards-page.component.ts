import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { CardToShow } from '../../models/cardToShow';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cards-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.css'
})
export class CardsPageComponent implements OnInit{

  constructor(private cardService:CardService, private localStorageService:LocaleStorageService, private toastService:ToastrService){}
  
  ngOnInit(): void {
    this.get();
  }

  cards: CardToShow[] = [];
  userId:number = this.localStorageService.getUserId();

  get(){
    this.cardService.get(this.userId).subscribe((response) => {
      this.cards = response.data;
    })
  }

  delete(cardId:number){
    this.cardService.delete(cardId).subscribe((response) => {
      this.toastService.success("Kart Başarıyla Silindi");
      this.ngOnInit();
    },(responseError) =>{
      this.toastService.error("Bir Hata Meydana Geldi");
    })
  }

}
