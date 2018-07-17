import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AnalyticsService implements OnInit {
    private fetchedExeData: Array<any>;
    dates : Array<any>;
    maxWeights : Array<any>;


    constructor(private http: HttpClient) {}
    ngOnInit(){

    }

    getExeData(exeName: string){
        return new Promise((resolve)=>{
            this.http.get(`http://localhost:3000/api/analytics/${exeName}`)
            .subscribe((res: {results:Array<any>})=>{
                this.fetchedExeData = res.results;
                this.sortByDate(this.fetchedExeData);
                this.getDatesArray();
                this.getMaxWeightsArray();
                resolve();
            });
        });

    }

    sortByDate(days: Array<any>) {
        days.sort(function(date1, date2){
            const d1 = new Date(Object.keys(date1)[0]);
            const d2 = new Date(Object.keys(date2)[0]);
            if (d1<d2)    return -1;
            else if(d1>d2) return  1;
            else return  0;
          });
    }

    getDatesArray () {
        const datesArray = this.fetchedExeData.map((day) => {
            return Object.keys(day)[0];
        });
        this.dates = datesArray;
    }

    getMaxWeightsArray () {
        const setsArray = this.fetchedExeData.map((day) => {
            const tempDay = JSON.parse(JSON.stringify(day));
            const sets = Object.values(tempDay)[0][0].sets;
            //sets mapped to leave only weights
            const mappedSets = sets.map((set) => {
                return +set.weight;
            });
            return mappedSets;
        });
        //sets with only weights mapped to find max weights
        const setsArrayMax = setsArray.map((set: Array<number>) => {
            return Math.max.apply(Math, set);
        });
        this.maxWeights = setsArrayMax;
    }

    getDates(){
        return this.dates;
    }

    getWeights(){
        return this.maxWeights;
    }
}