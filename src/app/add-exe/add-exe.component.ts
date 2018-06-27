import {Component, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Exe} from '../exe';

@Component({
  selector: 'app-add-exe',
  templateUrl: './add-exe.component.html',
  styleUrls: ['./add-exe.component.css']
})
export class AddExeComponent implements OnInit{
  exe: Exe = {name: 'Bench Press', sets: []};
  numberOfSets: number;
  constructor() {
    this.numberOfSets = 10;
  }

  ngOnInit() {
  }

  onSubmit() {

  }

  changeNumberOfSets(event) {
    this.numberOfSets = event.target.value;
  }

}
