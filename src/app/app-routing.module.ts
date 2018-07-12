import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { SaveTheDayComponent } from "./save-the-day/save-the-day.component";

const appRoutes: Routes = [
    {path: 'save', component: SaveTheDayComponent}
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