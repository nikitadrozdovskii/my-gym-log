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
  chart;
  ctx;
  colorScheme = ['#50514f','#f25f5c','#ffe066','#247ba0', '#70c1b3'];
  mindate;
  // private dates1;
  // private weights1;
  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }

  //use AnalyticsService to send request to server, check if there is response, accordingly
  //either display an error or call plot method to plot the first chart
  onSubmit(formName) {
    // this.dates1 = null;
    // this.weights1 = null;
    if (this.exeCounter === 0){
      this.anService.getExeData(formName.value).then(()=>{
        const dates = this.anService.getDates();
        if (dates.length===0) {
          this.errorMessage = "No results for given exercise, please make sure you entered the name correctly.";
          setTimeout(() => {
            this.errorMessage = null;
          },3500);
          return;
        }
        const weights = this.anService.getMaxWeights();
        const name = formName.value;
        this.plot(dates, weights, name);
      });
    } else {
      this.anService.getExeData(formName.value).then(()=>{
        const dates = this.anService.getDates();
        const weights = this.anService.getMaxWeights();
        const name = formName.value;
        this.addData(dates, weights, name);
      });
    }

    
  }

  //plot first exercise
  plot(dates: Array<string>, weights: Array<number>, name: string){
      //set default mindate of -1 months
      this.subtractMonths(1);
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      this.chart = new Chart(this.ctx, {
        "type":"line",
        "data":{"labels":dates,
        "datasets":[{"label":name,"data":weights,
        "fill":false,
        "borderColor":this.colorScheme[this.exeCounter%5],
        "lineTension":0.1}]},
        "options":{
          scales: {
            xAxes: [{
              type:'time',
              distribution: 'linear',
              time: {
                 min: this.mindate
              }
            }]
          }
        }});
        this.chart.update();
        this.exeCounter++;
  }

  //add 2nd+ exercise to the graph
  addData(labels: Array<string>, data: Array<number>, name: string) {
    //if no exes found, do not plot, display error message
    if (labels.length===0) {
      this.errorMessage = "No results for given exercise, please make sure you entered the name correctly.";
      setTimeout(() => {
        this.errorMessage = null;
      },3500);
      return;
    }
    //for each label in existing lables array, push null onto the new dataarray
    const newDataArray = [];
    this.chart.data.labels.forEach(() => {newDataArray.push(null)});
    data.forEach((d) => {
      newDataArray.push(d);
    });
    //push dates onto labels array
    labels.forEach((label) => {
      this.chart.data.labels.push(label);
    });

    this.chart.data.datasets.push({"label": name, "data": newDataArray, "fill":false, "borderColor": this.colorScheme[this.exeCounter%5]});
    this.chart.update();
    this.exeCounter++;
}

subtractMonths(number) {
  let now = new Date(Date.now());
  now.setMonth(now.getMonth() - number);
  this.mindate = now;
  if (this.chart){
    this.chart.options.scales.xAxes[0].time.min = this.mindate;
    this.chart.update();
  }
}

}
