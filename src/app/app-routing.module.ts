import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { SaveTheDayComponent } from "./save-the-day/save-the-day.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
    {path: '', component: LoginComponent, pathMatch: 'full'},
    {path: 'save', component: SaveTheDayComponent, canActivate: [AuthGuard]},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: LoginComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AppRoutingModule {}