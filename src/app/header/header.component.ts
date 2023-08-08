import { Component } from '@angular/core';

import { FetchService } from './save&fetch-from-header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private fetchService: FetchService) {}
  collapsed = true;

  onSaveRecipesAndIngredients() {
    this.fetchService.onSave();
  }

  onFetchRecipesAndIngredients() {
    this.fetchService.onFetch();
  }
}
