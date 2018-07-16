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
    private authErrorSource = new Subject<string>();  
    authErrored = this.authErrorSource.asObservable();
    private token: string;
    private tokenTimer: any;

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
            this.authErrorSource.next('This email appears to be in use. Please use a different one.');
        });
    }

    login(email: string, password: string) {
      this.http.post('http://localhost:3000/api/auth/login', {email, password})
      .subscribe((res: {token: string, expiresIn: string}) => {
        this.token = res.token;
        this.loginSource.next(true);
        console.log(res.expiresIn);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, res.expiresIn);
        this.router.navigate(["/save"]);
      }, (error) => {
        this.authErrorSource.next('Email/password combination is incorrect');
      });
    }

    logout() {
      this.token = null;
      this.loginSource.next(false);
      clearTimeout(this.tokenTimer);
      this.router.navigate(["/login"]);
    }
  }

  