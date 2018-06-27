import { Component, OnInit } from '@angular/core';
import {Exe} from '../exe';

@Component({
  selector: 'app-exe-detail',
  templateUrl: './exe-detail.component.html',
  styleUrls: ['./exe-detail.component.css']
})
export class ExeDetailComponent implements OnInit {
  exe: Exe = {
    name: 'Bench Press',
    reps: [10, 9, 9]
  }
  constructor() { }

  ngOnInit() {
  }

}
