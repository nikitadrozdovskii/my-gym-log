import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AnalyticsService implements OnInit {


    constructor(private http: HttpClient) {}
    ngOnInit(){

    }

    getMaxWeightData(exeName: string){
        this.http.get(`http://localhost:3000/api/analytics/${exeName}`)
        .subscribe((res: {dates:Array<string>, weights: Array<number>})=>{
            console.log(res);
        });
    }
}