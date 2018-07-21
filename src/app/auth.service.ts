import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from "../environments/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
  })
  export class AuthService implements OnInit {

    private loginSource = new Subject<{status: boolean, user: string}>();  
    loggedInStatus = this.loginSource.asObservable();
    private authErrorSource = new Subject<string>();  
    authErrored = this.authErrorSource.asObservable();
    private token: string;
    private tokenTimer: any;
    user: string;

    constructor(private http: HttpClient, private router: Router){}

    ngOnInit() {
    }

    getToken() {
      return this.token;
    }

    //set valid token, switch app state to loggedin
    setValidToken(token: string, expiresIn: number, user: string) {
      this.token = token;
      this.loginSource.next({status: true, user: user});

      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, expiresIn);

      this.router.navigate(["/save"]);
    }

    signup(email: string, password: string) {
      return new Promise((resolve, reject) => {
        this.http.post(`${BACKEND_URL}/auth/signup`, {email, password})
        .subscribe((res: {message: string}) => {
          resolve();
        }, (error) => {
            this.authErrorSource.next('This email appears to be in use. Please use a different one.');
        });
      });
    }

    //send post requrest with email/password, if there is a match, receive a token
    //set it in token attribute, setTimeout for it to expire in provided expiration
    //time. Save token and expiration date(and time) in local storage
    login(email: string, password: string) {
      this.http.post(`${BACKEND_URL}/auth/login`, {email, password})
      .subscribe((res: {token: string, expiresIn: string}) => {
        this.token = res.token;
        this.loginSource.next({status: true, user: email});

        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, +res.expiresIn);

        this.user = email;
        this.saveTokenLS(res.token, +res.expiresIn, email);
        this.router.navigate(["/save"]);
      }, (error) => {
        this.authErrorSource.next('Email/password combination is incorrect');
      });
    }

    logout() {
      this.token = null;
      this.user = null;
      this.loginSource.next({status: false, user: null});
      clearTimeout(this.tokenTimer);
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('user');
      this.router.navigate(["/login"]);
    }

  //gets auth token from local storage, check validity and decides login status accordingly
  checkLSToken() {
    const token = localStorage.getItem('token');
    const parsedExpiresAt = Date.parse(localStorage.getItem('expiresAt'));
    const user = localStorage.getItem('user');
    const now = Date.now();
    if (parsedExpiresAt < now) {
      //expired token, clear local storage, return
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('user');
      return;
    }
    const expiresIn = parsedExpiresAt - now;
    //save token to auth service
    this.setValidToken(token, expiresIn, user);
  }

    saveTokenLS(token: string, expiresIn: number, user: string) {
      localStorage.setItem('token', token);
      const expiresAt = new Date(Date.now() + expiresIn);
      localStorage.setItem('expiresAt', expiresAt.toISOString());
      localStorage.setItem('user', user);
    }
  }

  