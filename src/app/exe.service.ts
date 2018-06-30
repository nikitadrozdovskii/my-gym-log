import { Injectable } from '@angular/core';
import {Exe} from './exe';
import {Subject} from 'rxjs';

// Facilitates storage of exe objects
@Injectable({
  providedIn: 'root'
})
export class ExeService {
  exes: Exe[] = [];
  private exeEditRequestSource = new Subject<number>();
  exeEditRequest = this.exeEditRequestSource.asObservable();

  exeEditRequested(index: number) {
    this.exeEditRequestSource.next(index);
  }

  constructor() { }
  add(exe: Exe) {
    this.exes.push(exe);
    // console.log(this.exes[this.exes.length-1].sets === this.exes[this.exes.length - 2].sets);
  }

  delete(index: number) {
    this.exes.splice(index, 1);
    console.log(this.exes);
  }

  getExe(index: number) {
    const copy = JSON.parse(JSON.stringify(this.exes[index]));
    // console.log(this.exes[index] === copy);
    return copy;
  }

  edit(index: number, exe: Exe) {
    this.exes[index] = exe;
  }
}
