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
    this.http.post<{message: String, exe: Exe}>("http://localhost:3000/api/exes", exe).
    subscribe((res)=>{
      this.exes.push(res.exe);
    });
    console.log(this.exes);
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
