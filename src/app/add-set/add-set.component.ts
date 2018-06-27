import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.component.html',
  styleUrls: ['./add-set.component.css']
})
export class AddSetComponent implements OnInit {
  @Input() setNumber: number;
  constructor() { }

  ngOnInit() {
  }

}
