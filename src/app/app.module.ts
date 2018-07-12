import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ExeDetailComponent } from './exe-detail/exe-detail.component';
import { AddExeComponent } from './add-exe/add-exe.component';
import {FormsModule} from '@angular/forms';
import { AddSetComponent } from './add-set/add-set.component';
import { ProgPicComponent } from './prog-pic/prog-pic.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ExeDetailComponent,
    AddExeComponent,
    AddSetComponent,
    ProgPicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
