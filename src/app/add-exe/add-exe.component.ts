import {Component, EventEmitter, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Exe} from '../exe';
import {Set} from '../set';
import {ExeService} from '../exe.service';

// Contains form to add exercise with repeating AddSetComponent, whose number changes depending on user's input, listens to set updated
// event on each AppSetComponent, updates its own exe object accordingly. When user hits "Add exercise" button, it sends copy of its
// exe object to ExeService
@Component({
  selector: 'app-add-exe',
  templateUrl: './add-exe.component.html',
  styleUrls: ['./add-exe.component.css']
})
export class AddExeComponent implements OnInit {
  exe: Exe = {name: 'Bench Press', sets: [{reps: 0, weight: 0}, {reps: 0, weight: 0}, {reps: 0, weight: 0}]};
  numberOfSets: number;
  entireFormValid = true;


  constructor(private exeService: ExeService) {
    this.numberOfSets = 3;
  }

  ngOnInit() {
  }

  onSubmit() {
    const copy = Object.assign({}, this.exe);
    this.exeService.add(copy);
    // console.log(this.exe === copy);
    this.repopulateSets();
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

  onSetUpdated({weight, reps, i}) {
    this.exe.sets[i].weight = weight;
    this.exe.sets[i].reps = reps;
    // console.log(i);
    // console.log(this.exe.sets[i]);
  }
//   // FOR TESTING Constraint validation API
//   check(event: any) {
//     console.log(event.target.validity);
//   }

  onSetValidityChange(valid: boolean) {
    this.entireFormValid = valid;
  }

}

