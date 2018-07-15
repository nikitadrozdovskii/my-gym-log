import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
  export class AuthService implements OnInit {
    constructor(private http: HttpClient){}

    private token: string;

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
      }, (error) => {
        console.log(error);
      });
    }
  }

  