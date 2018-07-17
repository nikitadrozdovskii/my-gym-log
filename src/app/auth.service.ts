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

    //set valid token, switch app state to loggedin
    setValidToken(token: string, expiresIn: number) {
      this.token = token;
      this.loginSource.next(true);

      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, expiresIn);

      this.router.navigate(["/save"]);
    }

    signup(email: string, password: string) {
        this.http.post('http://localhost:3000/api/auth/signup', {email, password})
        .subscribe((res: {message: string}) => {
          // console.log(res.message);
        }, (error) => {
            this.authErrorSource.next('This email appears to be in use. Please use a different one.');
        });
    }

    //send post requrest with email/password, if there is a match, receive a token
    //set it in token attribute, setTimeout for it to expire in provided expiration
    //time. Save token and expiration date(and time) in local storage
    login(email: string, password: string) {
      this.http.post('http://localhost:3000/api/auth/login', {email, password})
      .subscribe((res: {token: string, expiresIn: string}) => {
        this.token = res.token;
        this.loginSource.next(true);

        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, +res.expiresIn);

        this.saveTokenLS(res.token, +res.expiresIn);
        this.router.navigate(["/save"]);
      }, (error) => {
        this.authErrorSource.next('Email/password combination is incorrect');
      });
    }

    logout() {
      this.token = null;
      this.loginSource.next(false);
      clearTimeout(this.tokenTimer);
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      this.router.navigate(["/login"]);
    }

  //gets auth token from local storage, check validity and decides login status accordingly
  checkLSToken() {
    const token = localStorage.getItem('token');
    const parsedExpiresAt = Date.parse(localStorage.getItem('expiresAt'));
    const now = Date.now();
    if (parsedExpiresAt < now) {
      //expired token, clear local storage, return
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      return;
    }
    const expiresIn = parsedExpiresAt - now;
    //save token to auth service
    this.setValidToken(token, expiresIn);
  }

    saveTokenLS(token: string, expiresIn: number) {
      localStorage.setItem('token', token);
      const expiresAt = new Date(Date.now() + expiresIn);
      localStorage.setItem('expiresAt', expiresAt.toISOString());
    }
  }

  