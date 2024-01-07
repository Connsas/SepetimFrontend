import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VatAddedPipe } from '../../pipes/vat-added.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, VatAddedPipe, FilterPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filterText:string = "";

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService:CategoryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts(){
    this.productService.getProducts().subscribe((response) =>{
      this.products = response.data;
    })
  }

  getProductsByCategory(categoryId: number){
    this.productService.getProductsByCategory(categoryId).subscribe((response) =>{
      this.products = response.data;
    })
  }
}
