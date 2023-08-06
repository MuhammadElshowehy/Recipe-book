import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { SaveRecipesService } from '../shared/save-recipes.service';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private saveRecipesService: SaveRecipesService,
    private recipesService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0){
      return this.saveRecipesService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
