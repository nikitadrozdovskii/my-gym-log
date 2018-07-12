import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { SaveTheDayComponent } from "./save-the-day/save-the-day.component";
import { AnalyticsComponent } from "./analytics/analytics.component";

const appRoutes: Routes = [
    {path: '', component: SaveTheDayComponent, pathMatch: 'full'},
    {path: 'save', component: SaveTheDayComponent},
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