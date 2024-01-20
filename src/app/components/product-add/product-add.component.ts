import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductImageService } from '../../services/product-image.service';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { ToastrService } from 'ngx-toastr';
import { SupplierIdNumber } from '../../models/supplierIdNumber';
import { ProductIdNumber } from '../../models/productIdNumber';
import { NumberRequest } from '../../models/numberRequest';
import { ProductAddModel } from '../../models/productAddModel';
import { ProductImageAddModel } from '../../models/productImageAddModel';
import { read } from 'fs';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private formBuilder: FormBuilder,
    private localStorageService: LocaleStorageService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.createProductAddForm();
  }

  categories: Category[];
  productAddForm: FormGroup;
  selectedFile: File;
  formData:FormData;
  userId = this.localStorageService.getUserId();

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      productPrice: ['', Validators.required],
      stockAmount: ['', Validators.required],
    });
  }

  

  add() {
    let productModel:ProductAddModel = Object.assign({}, this.productAddForm.value);
    productModel.categoryId = +productModel.categoryId
    let userId:NumberRequest = {userId:this.userId};
    this.productService.add(productModel, userId).subscribe((response) => {
      var ProductIdNumber:ProductIdNumber = {productId:response} 
      this.productImageService
        .add(this.selectedFile, ProductIdNumber)
        .subscribe((response) => {
          this.toast.success('Ürün Ekleme Başarılı');
        });
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  onSelectFile(e){
    this.selectedFile = <File>e.target.files[0];
    this.formData = new FormData();
    this.formData.append("img", this.selectedFile, this.selectedFile.name);
  }
}
