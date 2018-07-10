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

  uploadImage(image: File, date: string) {
    const imageData = new FormData();
    //date will serve as a name
    imageData.append('image', image, date);
    this.http.post(`http://localhost:3000/api/days/${date}/image`, imageData)
    .subscribe((res) => {
      console.log('got repsonse to post image reqest');
    });
  }

  add(exe: Exe, date: string) {
    this.http.post<{message: String, exe: Exe}>(`http://localhost:3000/api/exes/${date}`, exe).
    subscribe((res)=>{
      // this.exes.push(res.exe);
        this.getExesFromServer(date);
    }
    ,(error)=>{
      this.serverErrorSource.next(error.statusText);
    });
  }

  
  ngOnInit() {
  }

  getExesFromServer(date: string){
    //TBD get exes from server
    this.http.get<{message: string, exes: Exe[]}>(
      `http://localhost:3000/api/days/${date}`
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

  delete(date: string, id: number) {
    this.http.delete<{message: string, exes: Exe[]}>(
      `http://localhost:3000/api/exes/${date}/${id}`
    ).subscribe((response) => {
      // console.log(response);
      this.getExesFromServer(date);
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

  edit(date: string, id: number, exe: Exe) {
    this.http.put(`http://localhost:3000/api/days/${date}/${id}`, exe).subscribe((response)=> {
    this.getExesFromServer(date);      
    }
    ,(error)=>{
      this.serverErrorSource.next(error.statusText);
    });
  }

}
