import { Injectable } from '@angular/core';
import {Exe} from './exe';

// Facilitates storage of exe objects
@Injectable({
  providedIn: 'root'
})
export class ExeService {
  exes: Exe[] = [{name: 'Bench Press', sets: [
      {reps: 10, weight: 100},
      {reps: 10, weight: 100},
      {reps: 10, weight: 100},
    ]},
    {name: 'Squat', sets: [
        {reps: 8, weight: 150},
        {reps: 7, weight: 150},
        {reps: 5, weight: 140},
      ]}];

  constructor() { }
  add(exe: Exe) {
    this.exes.push(exe);
    console.log(this.exes);
  }

  delete(index: number) {
    this.exes.splice(index, 1);
  }
}
