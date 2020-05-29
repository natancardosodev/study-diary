import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EditComponent } from './studies/edit/edit.component';
import { ListComponent } from './studies/list/list.component';

import { AddStudyComponent } from './new/add-study/add-study.component';
import { EditStudyComponent } from './new/edit-study/edit-study.component';
import { StudiesListComponent } from './new/studies-list/studies-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ListComponent,
    AddStudyComponent,
    EditStudyComponent,
    StudiesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
