import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';

@Injectable()
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService){}

  private recipes: Recipe[] = [
    new Recipe(
      'meat',
      'A good halal meat',
      '../../../assets/meat.jpg',
      [new Ingredient('meat', 2), new Ingredient('onion', 3)]),
    new Recipe(
      'chicken',
      'A good halal chicken',
      '../../../assets/chicken.jpg',
      [new Ingredient('chicken', 3), new Ingredient('salt', 2)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.ingredientsFromRecipeService(ingredients);
  }
}