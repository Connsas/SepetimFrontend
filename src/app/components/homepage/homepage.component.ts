import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ProductsComponent, CategoryComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
