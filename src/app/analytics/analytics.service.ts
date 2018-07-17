import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AnalyticsService implements OnInit {
    fetchedExeData: Array<any>;
    dates;
    maxWeights;


    constructor(private http: HttpClient) {}
    ngOnInit(){

    }

    getExeData(exeName: string){
        this.http.get(`http://localhost:3000/api/analytics/${exeName}`)
        .subscribe((res: {results:Array<any>})=>{
            this.fetchedExeData = res.results;
            this.getDatesArray();
            this.getMaxWeightsArray();
        });
    }

    getDatesArray () {
        const datesArray = this.fetchedExeData.map((day) => {
            return Object.keys(day)[0];
        });
        this.dates = datesArray;
    }

    getMaxWeightsArray () {
        console.log(this.fetchedExeData);
        const setsArray = this.fetchedExeData.map((day) => {
            const tempDay = JSON.parse(JSON.stringify(day));
            const sets = Object.values(tempDay)[0][0].sets;
            //sets mapped to leave only weights
            const mappedSets = sets.map((set) => {
                return +set.weight;
            });
            return mappedSets;
        });
        console.log(setsArray);
        //sets with only weights mapped to find max weights
        const setsArrayMax = setsArray.map((set: Array<number>) => {
            return Math.max.apply(Math, set);
        });
        this.maxWeights = setsArrayMax;
    }
}