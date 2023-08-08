import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  constructor(private shoppingListService: ShoppingListService){}

  private recipes: Recipe[] = [];

  synchChanges(){
    this.recipesChanged.next(this.recipes.slice());
  }

  fetchedRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.synchChanges();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.ingredientsFromRecipeService(ingredients);
  }

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    this.synchChanges();
  }

  updateRecipe(index:number, editedRecipe: Recipe){
    this.recipes[index] = editedRecipe;
    this.synchChanges();
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.synchChanges();
  }
}
