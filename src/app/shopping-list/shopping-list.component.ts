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
  private obs: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}
  ingredients: Ingredient[];

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredient();
    this.obs = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {this.ingredients = ingredients}
    );
  }

  ngOnDestroy(){
    this.obs.unsubscribe();
  }
}
