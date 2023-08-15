import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { SaveFetchRecipesAndIngredientsService } from '../shared/save&fetch-recipes&ingredients.service';
import { ShoppingListService } from '../shopping-list/shoppingList.service';

@Injectable({providedIn: 'root'})
export class FetchService {
  constructor(
    private saveFetchRecipesAndIngredientsService: SaveFetchRecipesAndIngredientsService,
    private shoppingListService: ShoppingListService
  ) {}

  onSave() {
    this.saveFetchRecipesAndIngredientsService.saveRecipes();
    this.saveFetchRecipesAndIngredientsService.saveIngredients();
  }

  onFetch() {
    this.saveFetchRecipesAndIngredientsService.fetchRecipes().subscribe();
    this.saveFetchRecipesAndIngredientsService
      .fetchIngredients()
      .subscribe((ingredients: Ingredient[]) => {
        if (ingredients) {
          this.shoppingListService.fetchIngredients(ingredients);
        }
      });
  }
}
