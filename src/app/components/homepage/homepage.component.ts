import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { CategoryComponent } from '../category/category.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ProductsComponent, CategoryComponent, RouterModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
}
