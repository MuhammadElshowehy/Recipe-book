import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startEdit = new Subject<number>();
  private ingredients: Ingredient[] = [];

  getFilteredIngredients() {
    // combine similar ingredients:
    if (this.ingredients.length >= 1) {
      let filtered = [];
      let result = [];
      for (let i = 0; i < this.ingredients.length; i++) {
        if (!filtered.includes(this.ingredients[i].name)) {
          filtered.push(this.ingredients[i].name);
          let obj = {
            name: this.ingredients[i].name,
            amount: this.ingredients[i].amount,
          };
          result.push(obj);
        } else {
          for (let j = 0; j < result.length; j++) {
            if (this.ingredients[i].name === result[j].name) {
              result[j].amount += this.ingredients[i].amount;
            }
          }
        }
      }
      return result;
    }
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  synchChanges() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.synchChanges();
  }

  ingredientsFromRecipeService(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.synchChanges();
  }

  updateIngredient(index: number, editedItem: Ingredient) {
    this.ingredients[index] = editedItem;
    this.synchChanges();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.synchChanges();
  }

  fetchIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.synchChanges();
  }
}
