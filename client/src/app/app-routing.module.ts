import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatComponent } from './cat/cat.component';

const routes: Routes = [
  { path: 'cat', component: CatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
