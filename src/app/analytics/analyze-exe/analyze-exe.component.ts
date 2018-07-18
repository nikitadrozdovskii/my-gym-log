import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-analyze-exe',
  templateUrl: './analyze-exe.component.html',
  styleUrls: ['./analyze-exe.component.css']
})
export class AnalyzeExeComponent implements OnInit, AfterViewInit {

  constructor(private anService: AnalyticsService) { }
  errorMessage: string;
  // exe1: string;
  exeCounter = 0;
  canvas;
  ctx;
  // private dates1;
  // private weights1;
  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }

  onSubmit(formName) {
    // this.dates1 = null;
    // this.weights1 = null;
    this.anService.getExeData(formName.value).then(()=>{;
      const dates = this.anService.getDates();
      const weights = this.anService.getWeights();
      const name = formName.value;
      this.plot(dates, weights, name);
      this.exeCounter++;
    });
    
  }

  plot(dates: Array<string>, weights: Array<number>, name: string){
      //if there were no results
      if (dates.length===0) {
        this.errorMessage = "No results for given exercise, please make sure you entered the name correctly.";
        setTimeout(() => {
          this.errorMessage = null;
        },3500);
      }
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      let chart = new Chart(this.ctx, {
        "type":"line",
        "data":{"labels":dates,
        "datasets":[{"label":name,"data":weights,
        "fill":false,
        "borderColor":"rgb(75, 192, 192)",
        "lineTension":0.1}]},
        "options":{
          scales: {
            xAxes: [{
              type:'time',
              distribution: 'linear'
            }]
          }
        }});
  }
  
}
