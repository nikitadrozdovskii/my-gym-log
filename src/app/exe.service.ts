import { Injectable, OnInit } from '@angular/core';
import {Exe} from './exe';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Facilitates storage of exe objects
@Injectable({
  providedIn: 'root'
})
export class ExeService implements OnInit {
  private exes: Exe[] = [];
  private exeEditRequestSource = new Subject<number>();
  private exesUpdateRequestSource = new Subject<number>();
  exeEditRequest = this.exeEditRequestSource.asObservable();
  exesUpdated = this.exesUpdateRequestSource.asObservable();


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

  
  ngOnInit() {
  }

  getExesFromServer(){
    //TBD get exes from server
    this.http.get<{message: string, exes: Exe[]}>(
      "http://localhost:3000/api/exes"
    ).subscribe((exes) => {
      this.exes = exes.exes;
      this.exesUpdateRequestSource.next();
    });
  }
  
  getExes() {
    return JSON.parse(JSON.stringify(this.exes));
  }

  setExes(exes: Exe[]) {
    this.exes = exes;
  }

  delete(index: number) {
    //TBD: instead of accessing this.exes directly, send delete request, receive updated exes and assign them to exes
    // this.exes.splice(index, 1);
    this.http.delete<{message: string}>(
      "http://localhost:3000/api/exes"
    ).subscribe((response) => {
      console.log(response);
    }); 
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
