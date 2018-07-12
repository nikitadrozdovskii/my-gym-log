import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ExeDetailComponent } from './save-the-day/exe-detail/exe-detail.component';
import { AddExeComponent } from './save-the-day/add-exe/add-exe.component';
import {FormsModule} from '@angular/forms';
import { AddSetComponent } from './save-the-day/add-set/add-set.component';
import { ProgPicComponent } from './save-the-day/prog-pic/prog-pic.component';
import { AppRoutingModule } from './app-routing.module';
import { SaveTheDayComponent } from './save-the-day/save-the-day.component';
import { AnalyticsModule } from './analytics/analytics.module';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    ExeDetailComponent,
    AddExeComponent,
    AddSetComponent,
    ProgPicComponent,
    SaveTheDayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AnalyticsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
