import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import { SaveFetchRecipesAndIngredientsService } from 'src/app/shared/save&fetch-recipes&ingredients.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('myForm') myForm: NgForm;

  obs: Subscription;
  editMode: boolean = false;
  selectedItem: number;
  item: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private saveFetchRecipesAndIngredientsService: SaveFetchRecipesAndIngredientsService
  ) {}

  ngOnInit() {
    this.obs = this.shoppingListService.startEdit.subscribe((index: number) => {
      this.editMode = true;
      this.selectedItem = index;
      // console.log(this.editedItemIndex); //ok, index reached
      this.item = this.shoppingListService.getIngredient(index);
      this.myForm.setValue({
        name: this.item.name,
        amount: this.item.amount,
      });
    });
  }

  onAddItem(myForm: NgForm) {
    const newIngredient = new Ingredient(
      myForm.value.name,
      myForm.value.amount
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.selectedItem,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.saveFetchRecipesAndIngredientsService.saveIngredients();
    myForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedItem);
    this.saveFetchRecipesAndIngredientsService.saveIngredients();
    this.onCancel();
  }

  OnDeleteAllIngredients() {
    this.shoppingListService.deleteAllIngredients();
    this.saveFetchRecipesAndIngredientsService.saveIngredients();
  }

  onCancel() {
    this.myForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
