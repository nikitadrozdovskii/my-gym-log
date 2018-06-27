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

  decreaseSets() {
    if (this.numberOfSets < 1) {
      return;
    }
    this.numberOfSets--;
  }

  increaseSets() {
    if (this.numberOfSets > 19) {
      return;
    }
    this.numberOfSets++;
  }

  checkSets() {
    if (this.numberOfSets < 0 || this.numberOfSets > 20) {
      this.numberOfSets = 0;
    }
  }

}
