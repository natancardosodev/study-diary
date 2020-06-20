import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddStudyComponent } from './study/add-study/add-study.component';
import { StudiesListComponent } from './study/studies-list/studies-list.component';
import { EditStudyComponent } from './study/edit-study/edit-study.component';

const routes: Routes = [
  { path: '', redirectTo: '/study', pathMatch: 'full' },
  { path: 'study/register', component: AddStudyComponent },
  { path: 'study', component: StudiesListComponent },
  { path: 'study/edit/:id', component: EditStudyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
