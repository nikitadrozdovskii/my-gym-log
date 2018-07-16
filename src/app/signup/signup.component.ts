import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  email: string;
  password: string; 
  errorMessage: string;
  subscription;
  constructor(private authService: AuthService) {
   }

  ngOnInit() {
    this.subscription = this.authService.authErrored.subscribe((message) => {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = null;
      },3000);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.authService.signup(this.email, this.password);
  }
}
