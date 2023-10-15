import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  obs: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}
  ingredients: Ingredient[];

  ngOnInit() {
    this.ingredients = this.shoppingListService.getFilteredIngredients();
    this.obs = this.shoppingListService.ingredientsChanged.subscribe(() => {
      this.ingredients = this.shoppingListService.getFilteredIngredients();
    });
  }

  onEditItem(index: number) {
    this.shoppingListService.startEdit.next(index);
  }

  ingredientsLength() {
    if (this.ingredients) {
      return this.ingredients.length;
    } else {
      return 0;
    }
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
