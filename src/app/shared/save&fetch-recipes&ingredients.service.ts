import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Ingredient } from './ingredient.model';

@Injectable()
export class SaveFetchRecipesAndIngredientsService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    if (recipes) {
      this.http
        .put(
          'https://recipe-book-56a99-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
          recipes
        )
        .subscribe();
    } else {
      this.http
        .post(
          'https://recipe-book-56a99-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
          recipes
        )
        .subscribe();
    }
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-56a99-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((singleRecipe) => {
            return {
              ...singleRecipe,
              ingredients: singleRecipe.ingredients
                ? singleRecipe.ingredients
                : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.fetchedRecipes(recipes);
        })
      );
  }

  saveIngredients() {
    const ingredients = this.shoppingListService.getFilteredIngredients();
    if (ingredients) {
      this.http
        .put(
          'https://recipe-book-56a99-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json',
          ingredients
        )
        .subscribe();
    } else {
      this.http
        .post(
          'https://recipe-book-56a99-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json',
          ingredients
        )
        .subscribe();
    }
  }

  fetchIngredients() {
    return this.http.get<Ingredient[]>(
      'https://recipe-book-56a99-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json'
    );
  }
}
