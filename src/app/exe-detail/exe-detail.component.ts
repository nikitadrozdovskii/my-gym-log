import { Component, OnInit } from '@angular/core';
import {Exe} from '../exe';
import {Set} from '../set';

@Component({
  selector: 'app-exe-detail',
  templateUrl: './exe-detail.component.html',
  styleUrls: ['./exe-detail.component.css']
})
export class ExeDetailComponent implements OnInit {
  exe: Exe = {
    name: 'Bench Press',
    sets: [{reps: 10, weight: 50}, {reps: 10, weight: 53}, {reps: 10, weight: 55}]
  }
  constructor() { }

  ngOnInit() {
  }

}
