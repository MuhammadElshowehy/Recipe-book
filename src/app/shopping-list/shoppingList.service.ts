import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startEdit = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('cucumbers', 10),
    new Ingredient('tomatoes', 5),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  synchChanges(){
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.synchChanges();
  }

  ingredientsFromRecipeService(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.synchChanges();
  }

  updateIngredient(index: number, editedItem: Ingredient){
    this.ingredients[index] = editedItem;
    this.synchChanges();
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.synchChanges();
  }
}
