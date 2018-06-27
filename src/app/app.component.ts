import {Component, OnInit} from '@angular/core';
import {Exe} from './exe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  exes: Exe[] = [{name: 'Bench Press', sets: [
      {reps: 10, weight: 100},
      {reps: 10, weight: 100},
      {reps: 10, weight: 100},
    ]},
    {name: 'Squat', sets: [
        {reps: 8, weight: 150},
        {reps: 7, weight: 150},
        {reps: 5, weight: 140},
      ]}];

}
