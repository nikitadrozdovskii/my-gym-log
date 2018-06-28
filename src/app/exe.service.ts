import { Injectable } from '@angular/core';
import {Exe} from './exe';

// Facilitates storage of exe objects
@Injectable({
  providedIn: 'root'
})
export class ExeService {
  exes: Exe[] = [];

  constructor() { }
  add(exe: Exe) {
    this.exes.push(exe);
    // console.log(this.exes[this.exes.length-1].sets === this.exes[this.exes.length - 2].sets);
  }

  delete(index: number) {
    this.exes.splice(index, 1);
    console.log(this.exes);
  }
}
