import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroComponent } from './pages/superhero/superhero.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  {
    path: "",
    component: IndexComponent
  },
  {
    path: "superheroes",
    component: SuperheroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
