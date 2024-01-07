import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  constructor(private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  categories:Category[] = [];
  currentCategory:Category = {categoryId:0, categoryName: "Dummy"};

  getCategories() {
    this.categoryService.getCategories().subscribe((response) =>{
      this.categories = response.data;
    })
  }

  setCurrentCategory(category:Category){
    this.currentCategory = category;
  }

  removeCurrentCategory(){
    this.currentCategory = {categoryId:0, categoryName: "Dummy"};
  }

  getCurrentCategoryClass(category:Category){
    if(category == this.currentCategory){
      return 'list-group-item active';
    }else{
      return 'list-group-item disable';
    }
  }

  getAllCategoryClass(){
    if (this.currentCategory.categoryId == 0) {
      return 'list-group-item active';
    } else {
      return 'list-group-item disable';
    }
  }
}
