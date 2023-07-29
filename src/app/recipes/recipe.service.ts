import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
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
    new Recipe(
      'rice',
      'A good rice',
      '../../assets/rice.jpg',
      [new Ingredient('rice', 3), new Ingredient('salt', 2), new Ingredient('water', 1)]
    ),
    new Recipe(
      'bread',
      'A good bread',
      '../../assets/bread.jpg',
      [new Ingredient('flour', 3), new Ingredient('water', 2)]
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

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    this.synchChanges();
  }

  updateRecipe(index:number, editedRecipe: Recipe){
    this.recipes[index] = editedRecipe;
    this.synchChanges();
  }

  synchChanges(){
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.synchChanges();
  }
}
