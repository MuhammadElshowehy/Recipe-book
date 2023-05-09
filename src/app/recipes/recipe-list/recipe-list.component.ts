import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'meat',
      'A good halal meat',
      '../../../assets/meat.jpg'),
    new Recipe(
      'chicken',
      'A good halal chicken',
      '../../../assets/chicken.jpg'),
  ];
}
