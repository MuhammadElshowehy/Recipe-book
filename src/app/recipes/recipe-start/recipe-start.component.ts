import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
})
export class RecipeStartComponent implements OnInit {
  recipesFound: boolean = false;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe((recipes) => {
      if (recipes) {
        this.recipesFound = true;
      }
    });
  }
}
