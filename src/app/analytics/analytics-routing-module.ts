import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnalyticsComponent } from "./analytics.component";
import { ComparePicsComponent } from "./compare-pics/compare-pics.component";
import { AnalyzeExeComponent } from "./analyze-exe/analyze-exe.component";
import { AuthGuard } from "../auth.guard";

const analyticsRoutes: Routes = [
    {path: 'analyze', component: AnalyticsComponent, canActivate: [AuthGuard], children: [
        {path: 'compare-pics', component: ComparePicsComponent},
        {path: 'analyze-exe', component: AnalyzeExeComponent}
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(analyticsRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AnalyticsRoutingModule {

}