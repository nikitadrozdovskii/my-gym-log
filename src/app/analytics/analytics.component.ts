import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor(private anService: AnalyticsService) { }

  ngOnInit() {
  }


}
