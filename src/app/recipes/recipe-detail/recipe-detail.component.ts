import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SaveFetchRecipesAndIngredientsService } from 'src/app/shared/save&fetch-recipes&ingredients.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  hasIngredients: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private saveFetchRecipesAndIngredientsService: SaveFetchRecipesAndIngredientsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);

      if (this.recipe.ingredients.length > 0) {
        this.hasIngredients = true;
      } else {
        this.hasIngredients = false;
      }
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
    this.saveFetchRecipesAndIngredientsService.saveIngredients();
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
    this.saveFetchRecipesAndIngredientsService.saveRecipes();
  }

  scrollUp() {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
