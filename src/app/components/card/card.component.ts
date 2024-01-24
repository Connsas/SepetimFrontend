import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardToShow } from '../../models/cardToShow';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { CardService } from '../../services/card.service';
import { CardToAdd } from '../../models/cardToAdd';
import { ToastrService } from 'ngx-toastr';
import { CardToDelete } from '../../models/cardToDelete';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  constructor(private formBuilder:FormBuilder, private localStorageService:LocaleStorageService, private cardService:CardService, private toastService:ToastrService){}
  
  ngOnInit(): void {
    this.createCardAddForm();
  }


  cardAddForm: FormGroup;
  cardToShow: CardToShow[] = [];
  userId:number = this.localStorageService.getUserId();

  createCardAddForm(){
    this.cardAddForm = this.formBuilder.group({
      paymentName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expDate: ['', Validators.required],
      cvv: ['', Validators.required]
    })
  }

  add(){
    var cardToAdd:CardToAdd = Object.assign({}, this.cardAddForm.value);
    cardToAdd.userId = this.userId;
    console.log(cardToAdd);
    this.cardService.add(cardToAdd).subscribe((response) => {
      this.toastService.success("Kartınız Başarıyla Eklendi.");
    },(responseError) =>{
      console.log(responseError);
    })
  }

  // get(){
  //   this.cardService.get(this.userId).subscribe((response) =>{
  //     this.cardToShow = response.data;
  //   });
  // }

  // delete(cardId:number){
  //   var cardToDelete:CardToDelete = {cardId: cardId};
  //   this.cardService.delete(cardToDelete).subscribe((response) =>{
  //     this.toastService.info("Kartınız Başarıyla Silindi");
  //   },(responseError) => {
  //     console.log(responseError);
  //   });
  // }
}
