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
    this.ingredients = this.shoppingListService.getIngredients();
    this.obs = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shoppingListService.startEdit.next(index);
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
