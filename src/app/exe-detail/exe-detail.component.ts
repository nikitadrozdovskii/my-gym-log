import {Component, Input, OnInit} from '@angular/core';
import {Exe} from '../exe';

@Component({
  selector: 'app-exe-detail',
  templateUrl: './exe-detail.component.html',
  styleUrls: ['./exe-detail.component.css']
})
export class ExeDetailComponent implements OnInit {
  @Input('detailedExe') exe: Exe;
  constructor() { }


  ngOnInit() {}


}
