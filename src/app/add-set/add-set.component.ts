import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.component.html',
  styleUrls: ['./add-set.component.css']
})
export class AddSetComponent implements OnInit {
  @Input() setNumber: number;
  @Input('setIndex') index: number;
  @Output() setUpdated: EventEmitter<{weight: number, reps: number}> = new EventEmitter<{weight: number, reps: number}>();
  weight = 0;
  reps = 0;

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
    this.setUpdated.emit({weight: this.weight, reps: this.reps});
    console.log(`Set index ${this.index} is updated to: weight = ${this.weight}, reps = ${this.reps}`);
  }

}
