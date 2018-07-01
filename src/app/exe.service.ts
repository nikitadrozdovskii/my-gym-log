import { Injectable } from '@angular/core';
import {Exe} from './exe';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }
  add(exe: Exe) {
    this.exes.push(exe);
    this.http.post<Exe>("http://localhost:3000/api/exes", exe).
    subscribe();
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
