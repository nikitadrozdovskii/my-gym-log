import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
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
    this.authService.login(this.email, this.password);
  }
}
