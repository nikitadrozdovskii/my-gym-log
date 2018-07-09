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
  private exesUpdateRequestSource = new Subject<Exe[]>();
  private serverErrorSource = new Subject<string>();
  exeEditRequest = this.exeEditRequestSource.asObservable();
  exesUpdated = this.exesUpdateRequestSource.asObservable();
  serverErrored = this.serverErrorSource.asObservable();


  exeEditRequested(index: number) {
    this.exeEditRequestSource.next(index);
  }

  constructor(private http: HttpClient) { }

  add(exe: Exe, date: string) {
    this.http.post<{message: String, exe: Exe}>(`http://localhost:3000/api/exes/${date}`, exe).
    subscribe((res)=>{
      this.exes.push(res.exe);
      this.exesUpdateRequestSource.next();
    }
    ,(error)=>{
      this.serverErrorSource.next(error.statusText);
    });
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
    }
    ,(error)=>{
      this.serverErrorSource.next(error.statusText);
    }
  );
  }
  
  getExes() {
    return JSON.parse(JSON.stringify(this.exes));
  }

  setExes(exes: Exe[]) {
    this.exes = exes;
  }

  delete(id: number) {
    this.http.delete<{message: string, exes: Exe[]}>(
      `http://localhost:3000/api/exes/${id}`
    ).subscribe((response) => {
      // console.log(response);
      //TBD: instead of getting all exes after deletion, delete needed one on front end
      this.getExesFromServer();
    },
    (error)=>{
      this.serverErrorSource.next(error.statusText);
    }); 
  }

  getExe(index: number) {
    const copy = JSON.parse(JSON.stringify(this.exes[index]));
    // console.log(this.exes[index] === copy);
    return copy;
  }

  edit(id: number, exe: Exe) {
    this.http.put(`http://localhost:3000/api/exes/${id}`, exe).subscribe((response)=> {
      this.getExesFromServer();      
    }
    ,(error)=>{
      this.serverErrorSource.next(error.statusText);
    });
  }

}
