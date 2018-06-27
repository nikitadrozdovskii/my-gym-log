import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExeDetailComponent } from './exe-detail/exe-detail.component';
import { AddExeComponent } from './add-exe/add-exe.component';
import {FormsModule} from '@angular/forms';
import { AddSetComponent } from './add-set/add-set.component';

@NgModule({
  declarations: [
    AppComponent,
    ExeDetailComponent,
    AddExeComponent,
    AddSetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
