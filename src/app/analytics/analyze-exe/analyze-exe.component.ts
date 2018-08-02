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
  colorScheme = ['#ffed59','#2667f9','#16e6d8','#f44cff', '#46e49a'];
  mindate;
  maxWeights = [];
  workoutVolumes = [];
  // private dates1;
  // private weights1;
  ngOnInit() {
  }

  ngAfterViewInit() {
    Chart.defaults.global.defaultFontColor = '#f2f2f0';
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
  }

  //use AnalyticsService to send request to server, check if there is response, accordingly
  //either display an error or call plot method to plot the first chart
  onSubmit(formName) {
    //if it is first exercise, use plot method, else use addData method
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
        //plot max weights by default, but get Volume also
        const weights = this.anService.getMaxWeights();
        const workoutVolume = this.anService.getWorkoutVolume();
        //store max weights and volume datasets for future use
        this.maxWeights.push(weights);
        this.workoutVolumes.push(workoutVolume);

        const name = formName.value;
        this.plot(dates, weights, name);
      });
    } else {
      this.anService.getExeData(formName.value).then(()=>{
        const dates = this.anService.getDates();
        const weights = this.anService.getMaxWeights();
        const workoutVolume = this.anService.getWorkoutVolume();

        //prepend nulls for existing labels:
        const newWeights = [];
        this.chart.data.labels.forEach(() => {newWeights.push(null)});
        weights.forEach((d) => {
          newWeights.push(d);
        });
        const newWorkoutVolume = [];
        this.chart.data.labels.forEach(() => {newWorkoutVolume.push(null)});
        workoutVolume.forEach((d) => {
          newWorkoutVolume.push(d);
        });

        //store max weights dataset for future use
        this.maxWeights.push(newWeights);
        this.workoutVolumes.push(newWorkoutVolume);


        const name = formName.value;
        this.addData(dates, weights, name);
        console.log(this.workoutVolumes);
        console.log(this.chart.data.datasets);
      });
    }

    
  }

  //plot first exercise
  plot(dates: Array<string>, weights: Array<number>, name: string){
      //set default mindate of -1 months
      this.subtractMonths(1);
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
              },
            gridLines: {
              color: 'rgba(242,242,240,0.07)'
            }
            }],
            yAxes: [{
            gridLines: {
              color: 'rgba(242,242,240,0.07)'
            }
            }]
          }
        }});
        this.chart.update();
        this.exeCounter++;
        // this.chart.data.datasets[0].data
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

//swtich datasets in graph to Max Weights or Volume while keeping exercise labels and order
switchData(option: string) {
  if (option==='max'){
    // this.chart.data.datasets.forEach((exe)=>{
    //   exe.data = 
    // });
    for (let i=0;i<this.chart.data.datasets.length;i++){
      this.chart.data.datasets[i].data = this.maxWeights[i];
    }
  } else {
    for (let i=0;i<this.chart.data.datasets.length;i++){
      this.chart.data.datasets[i].data = this.workoutVolumes[i];
    }
  }
  this.chart.update();
}

reset() {
  this.chart.destroy();
  this.chart=null;
  console.log(this.chart);
  this.exeCounter = 0;
  this.mindate = null;
  this.maxWeights.length = 0;
  this.workoutVolumes.length = 0;
}
}
