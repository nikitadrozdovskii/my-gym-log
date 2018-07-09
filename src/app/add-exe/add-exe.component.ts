import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Exe} from '../exe';
import {Set} from '../set';
import {ExeService} from '../exe.service';
import {Subscription} from 'rxjs';

// Contains form to add exercise with repeating AddSetComponent, whose number changes depending on user's input, listens to set updated
// event on each AppSetComponent, updates its own exe object accordingly. When user hits "Add exercise" button, it sends copy of its
// exe object to ExeService
@Component({
  selector: 'app-add-exe',
  templateUrl: './add-exe.component.html',
  styleUrls: ['./add-exe.component.css']
})
export class AddExeComponent implements OnInit, OnDestroy {
  @Input() exe: Exe = {_id: null ,name: 'My Exercise', sets: [{reps: 0, weight: 0}, {reps: 0, weight: 0}, {reps: 0, weight: 0}]};
  numberOfSets: number;
  entireFormValid = true;
  subscription: Subscription;
  editMode = false;
  indexToEdit: number;
  nameValid = true;
  @Input ('AddExeDate') date: string;

  constructor(private exeService: ExeService) {
    this.numberOfSets = 3;
    this.subscription = exeService.exeEditRequest.subscribe(
      (index) => {
        // console.log(`you want to edit exe with index ${index}`);
        this.exe = exeService.getExe(index);
        this.indexToEdit = index;
        this.numberOfSets = this.exe.sets.length;
        // console.log(this.exe);
        this.editMode = true;
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const copy = JSON.parse(JSON.stringify(this.exe));
    this.exeService.add(copy, this.date);
    // console.log(this.exe === copy);
    this.repopulateSets();
  }

  onEdit() {
    const copy = JSON.parse(JSON.stringify(this.exe));
    this.exeService.edit(this.date, this.exe._id, copy);
    this.editMode = false;
    this.repopulateSets();
  }

  changeNumberOfSets(event) {
    this.numberOfSets = event.target.value;
    this.repopulateSets();
    console.log(event);
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

  validateName(event) {
    if (event.target.validity.valueMissing){
      this.nameValid = false;
      this.entireFormValid = false;
    } else {
      this.nameValid = true;
      this.entireFormValid = true;
    }
  }

}

