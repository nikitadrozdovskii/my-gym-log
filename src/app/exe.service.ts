import { Injectable, OnInit } from '@angular/core';
import {Exe} from './exe';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from "../environments/environment";

const BACKEND_URL = environment.apiUrl;
// Facilitates storage of exe objects
@Injectable({
  providedIn: 'root'
})
export class ExeService implements OnInit {
  private exes: Exe[] = [];
  private exeEditRequestSource = new Subject<number>();
  private exesUpdateRequestSource = new Subject<Exe[]>();
  private serverErrorSource = new Subject<string>();
  private imageUpdateSource = new Subject<string>();
  private imageSaveSource = new Subject<string>();  
  exeEditRequest = this.exeEditRequestSource.asObservable();
  exesUpdated = this.exesUpdateRequestSource.asObservable();
  serverErrored = this.serverErrorSource.asObservable();
  imageUpdated = this.imageUpdateSource.asObservable();
  imageSaved = this.imageSaveSource.asObservable();


  exeEditRequested(index: number) {
    this.exeEditRequestSource.next(index);
  }

  constructor(private http: HttpClient) { }

  uploadImage(image: File, date: string) {
    const imageData = new FormData();
    //date will serve as a name
    imageData.append('image', image, date);
    this.http.post(`${BACKEND_URL}/image/${date}`, imageData)
    .subscribe((res: {message: string, imagePath: string}) => {
      this.imageSaveSource.next();
    },(error) => {
      window.scrollTo(0, 0);
      this.serverErrorSource.next(error.error.message);
    });
  }

  deleteImage(date: string) {
    this.http.delete(`${BACKEND_URL}/image/${date}`).subscribe(
      (res: {message: string}) => {
        this.imageSaveSource.next('deleted');
      },(error) => {
        // window.scrollTo(0, 0);
        // this.serverErrorSource.next(error.error.message);
      }
    );
  }

  getImageFromServer(date: string) {
    this.http.get(`${BACKEND_URL}/image/${date}`).subscribe((res: {imagePath:string}) => {
      this.imageUpdateSource.next(res.imagePath);
    },(error) => {
      this.imageUpdateSource.next(null);
    });

  }

  add(exe: Exe, date: string) {
    this.http.post<{message: String, exe: Exe}>(`${BACKEND_URL}/exes/${date}`, exe).
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
      `${BACKEND_URL}/exes/${date}`
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
      `${BACKEND_URL}/exes/${date}/${id}`
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
    this.http.put(`${BACKEND_URL}/exes/${date}/${id}`, exe).subscribe((response)=> {
    this.getExesFromServer(date);      
    }
    ,(error)=>{
      this.serverErrorSource.next(error.statusText);
    });
  }

}
