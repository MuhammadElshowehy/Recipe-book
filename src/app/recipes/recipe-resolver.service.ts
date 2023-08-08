import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { SaveFetchRecipesAndIngredientsService } from '../shared/save&fetch-recipes&ingredients.service';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private saveFetchRecipesAndIngredientsService: SaveFetchRecipesAndIngredientsService,
    private recipesService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      return this.saveFetchRecipesAndIngredientsService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
