import {Component, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Exe} from '../exe';
import {Set} from '../set';
import {ExeService} from '../exe.service';

@Component({
  selector: 'app-add-exe',
  templateUrl: './add-exe.component.html',
  styleUrls: ['./add-exe.component.css']
})
export class AddExeComponent implements OnInit {
  exe: Exe = {name: 'Bench Press', sets: []};
  numberOfSets: number;
  // sets: Set[];
  constructor(private exeService: ExeService) {
    this.numberOfSets = 10;
  }

  ngOnInit() {
  }

  onSubmit() {
    const copy = Object.assign({}, this.exe);
    this.exeService.add(copy);
  }

  changeNumberOfSets(event) {
    this.numberOfSets = event.target.value;
    this.repopulateSets();
  }

  repopulateSets() {
    this.exe.sets = [];
    for (let i = 0; i < this.numberOfSets; i++) {
      this.exe.sets.push({reps: 0, weight: 0});
    }
    // console.log(this.exe);
  }

}
