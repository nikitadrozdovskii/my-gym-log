import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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
    this.authService.signup(this.email, this.password);
  }
}
