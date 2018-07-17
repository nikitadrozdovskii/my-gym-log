import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-analyze-exe',
  templateUrl: './analyze-exe.component.html',
  styleUrls: ['./analyze-exe.component.css']
})
export class AnalyzeExeComponent implements OnInit, AfterViewInit {

  constructor() { }

  canvas;
  ctx;
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let chart = new Chart(this.ctx, {
      "type":"line",
      "data":{"labels":["January","February","March","April","May","June","July"],
      "datasets":[{"label":"My First Dataset","data":[65,59,80,81,56,55,40],
      "fill":false,
      "borderColor":"rgb(75, 192, 192)",
      "lineTension":0.1}]},
      "options":{}});
  }

    
  
}
