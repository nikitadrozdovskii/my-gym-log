import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })
  export class AuthService implements OnInit {

    private loginSource = new Subject<boolean>();  
    loggedInStatus = this.loginSource.asObservable();
    private token: string;

    constructor(private http: HttpClient, private router: Router){}

    ngOnInit() {

    }

    getToken() {
      return this.token;
    }

    signup(email: string, password: string) {
        this.http.post('http://localhost:3000/api/auth/signup', {email, password})
        .subscribe((res: {message: string}) => {
          console.log(res.message);
        }, (error) => {
          console.log(error);
        });
    }

    login(email: string, password: string) {
      this.http.post('http://localhost:3000/api/auth/login', {email, password})
      .subscribe((res: {token: string}) => {
        this.token = res.token;
        this.loginSource.next(true);
      }, (error) => {
        console.log(error);
      });
    }

    logout() {
      this.token = null;
      this.loginSource.next(false);
      this.router.navigate(["/login"]);
    }
  }

  