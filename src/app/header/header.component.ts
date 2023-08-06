import { Component } from '@angular/core';
import { SaveRecipesService } from '../shared/save-recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private saveRecipesService: SaveRecipesService){}
  collapsed = true;

  onSaveRecipes(){
    this.saveRecipesService.saveRecipes();
  }

  onFetchRecipes(){
    this.saveRecipesService.fetchRecipes().subscribe();
  }
}
