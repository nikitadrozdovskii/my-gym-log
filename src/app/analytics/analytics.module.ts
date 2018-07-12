import { NgModule } from "@angular/core";
import { AnalyticsRoutingModule } from "./analytics-routing-module";
import { AnalyticsComponent } from "./analytics.component";
import { AnalyzeExeComponent } from "./analyze-exe/analyze-exe.component";
import { ComparePicsComponent } from "./compare-pics/compare-pics.component";

@NgModule({
    imports: [
        AnalyticsRoutingModule
    ],
    declarations: [
        AnalyticsComponent,
        AnalyzeExeComponent,
        ComparePicsComponent
    ]
})
export class AnalyticsModule {}