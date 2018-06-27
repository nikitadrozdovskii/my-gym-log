import {Component, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Exe} from '../exe';
import {Set} from '../set';

@Component({
  selector: 'app-add-exe',
  templateUrl: './add-exe.component.html',
  styleUrls: ['./add-exe.component.css']
})
export class AddExeComponent implements OnInit{
  exe: Exe = {name: 'Bench Press', sets: []};
  numberOfSets: number;
  sets: Set[];
  constructor() {
    this.numberOfSets = 10;
  }

  ngOnInit() {
  }

  onSubmit() {

  }

  changeNumberOfSets(event) {
    this.numberOfSets = event.target.value;
    this.repopulateSets();
  }

  repopulateSets() {
    this.sets = [];
    for (let i = 0; i < this.numberOfSets; i++) {
      this.sets.push({reps: 0, weight: 0});
    }
    console.log(this.sets);
  }

}
