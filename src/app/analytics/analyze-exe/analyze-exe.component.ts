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
  exe1: string;
  canvas;
  ctx;
  private dates;
  private weights;
  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }

  onSubmit() {
    this.plot();
  }

  plot(){
    this.anService.getExeData(this.exe1).then(()=>{;
      this.dates = this.anService.getDates();
      this.weights = this.anService.getWeights();
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      let chart = new Chart(this.ctx, {
        "type":"line",
        "data":{"labels":this.dates,
        "datasets":[{"label":"Max Weight","data":this.weights,
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
    });

  }
  
}
