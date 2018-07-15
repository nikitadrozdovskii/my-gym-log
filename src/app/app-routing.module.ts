import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { SaveTheDayComponent } from "./save-the-day/save-the-day.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
    {path: '', component: SaveTheDayComponent, pathMatch: 'full'},
    {path: 'save', component: SaveTheDayComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: SaveTheDayComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}