import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';


// Contains form to add an individual set. setIndex property is passed down from host AddExe component. On user input to either field
// class emits event passing updated values of weight and reps to host AddExe component.
@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.component.html',
  styleUrls: ['./add-set.component.css']
})
export class AddSetComponent implements OnInit {
    // @Input() setNumber: number;
  @Input('setIndex') index: number;
  @Output() setUpdated: EventEmitter<{weight: number, reps: number, i: number}> = new EventEmitter<{weight: number, reps: number, i: number}>();
  weight = 0;
  reps = 0;
  repsAlertText = '';
  weightAlertText = '';
  repsValid = true;
  weightValid = true;

  constructor() { }

  ngOnInit() {
  }

  onUserInput(input: any) {
    if (input.weight) {
      this.weight = input.weight;
    }
    if (input.reps) {
      this.reps = input.reps;
    }
    this.setUpdated.emit({weight: this.weight, reps: this.reps, i: this.index});
    // console.log(`Set index ${this.index} is updated to: weight = ${this.weight}, reps = ${this.reps}`);
  }

  onIncreaseWeight() {
    this.weight++;
    this.setUpdated.emit({weight: this.weight, reps: this.reps, i: this.index});
    this.weightValid = true;
    this.weightAlertText = '';
    // console.log(this.weight);
  }

  onDecreaseWeight() {
    if (this.weight > 0) {
      this.weight--;
      this.weightValid = true;
      this.weightAlertText = '';
      this.setUpdated.emit({weight: this.weight, reps: this.reps, i: this.index});
    }
    // console.log(this.weight);
  }

  onIncreaseReps () {
    this.reps++;
    this.setUpdated.emit({weight: this.weight, reps: this.reps, i: this.index});
    this.repsValid = true;
    this.repsAlertText = '';
  }

  onDecreaseReps () {
    if (this.reps > 0) {
      this.reps--;
      this.setUpdated.emit({weight: this.weight, reps: this.reps, i: this.index});
      this.repsValid = true;
      this.repsAlertText = '';
    }
  }

  checkRepsValidity(event: any) {
    // console.log(event.target.validity);
    if (event.target.validity.badInput === true) {
      this.repsAlertText = 'Reps must be a number';
      this.repsValid = false;
    } else {
      this.repsAlertText = '';
      this.repsValid = true;
    }
  }

  checkWeightValidity(event) {
    if (event.target.validity.badInput === true) {
      this.weightAlertText = 'Weight must be a number';
      this.weightValid = false;
    } else {
      this.weightAlertText = '';
      this.weightValid = true;
    }
  }

}
