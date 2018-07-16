import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string; 
  constructor(private authService: AuthService) {
   }

  ngOnInit() {
    this.authService.authErrored.subscribe((message) => {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = null;
      },3000);
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password);
  }
}
