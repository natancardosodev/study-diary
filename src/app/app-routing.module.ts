import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ListComponent } from './studies/list/list.component';
// import { EditComponent } from './studies/edit/edit.component';

import { AddStudyComponent } from './new/add-study/add-study.component';
import { StudiesListComponent } from './new/studies-list/studies-list.component';
import { EditStudyComponent } from './new/edit-study/edit-study.component';

const routes: Routes = [
  // { path: '', component: ListComponent },
  // { path: 'edit', component: EditComponent },
  { path: '', redirectTo: '/study/register', pathMatch: 'full' },
  { path: 'study/register', component: AddStudyComponent },
  { path: 'study', component: StudiesListComponent },
  { path: 'study/edit/:id', component: EditStudyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
