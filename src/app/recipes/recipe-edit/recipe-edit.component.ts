import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { SaveFetchRecipesAndIngredientsService } from 'src/app/shared/save&fetch-recipes&ingredients.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent {
  recipes: Recipe[] = [];
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private saveFetchRecipesAndIngredientsService: SaveFetchRecipesAndIngredientsService
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = +params['id'];
        this.editMode = true;
      }
      this.initForm();
    });
  }

  initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imgPath;
      recipeDesc = recipe.desc;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [
        Validators.required,
        this.nameValidate.bind(this),
      ]),
      imgPath: new FormControl(recipeImgPath, Validators.required),
      desc: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  addIngredient() {
    const newIngredient = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(newIngredient);
  }

  nameValidate(control: FormControl) {
    if(this.recipes){
      for (let recipe of this.recipes) {
        if (recipe.name === control.value.trim() && this.editMode === false) {
          return { nameIsFound: true };
        }
      }
    }
  }

  removeIngredient(num: number) {
    let singleIngredient = <FormArray>this.recipeForm.get('ingredients');
    singleIngredient.removeAt(num);
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(<Recipe>this.recipeForm.value);
    }
    this.saveFetchRecipesAndIngredientsService.saveRecipes();
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
