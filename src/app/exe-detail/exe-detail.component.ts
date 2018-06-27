import {Component, Input, OnInit} from '@angular/core';
import {Exe} from '../exe';

// Contains template for displaying individual exercise that is passed down from AppComponent via @Input.
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
