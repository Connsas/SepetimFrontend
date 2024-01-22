import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterCategory',
  standalone: true
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: Product[], filterCategoryId: number): Product[] {
    return filterCategoryId?value.filter((p:Product) => p.categoryId == filterCategoryId):value;
  }

}
