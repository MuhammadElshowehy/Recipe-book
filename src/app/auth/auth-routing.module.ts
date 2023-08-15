import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth.component";

const myRoutes: Routes = [
  { path: 'auth', component: AuthComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(myRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
