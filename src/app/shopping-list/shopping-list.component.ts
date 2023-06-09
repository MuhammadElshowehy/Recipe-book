import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  constructor(private shoppingListService: ShoppingListService) {}
  ingredients: Ingredient[];

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredient();
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {this.ingredients = ingredients}
    );
  }
}
