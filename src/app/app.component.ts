import {Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from './auth.service';

// Hosts AddExe component with form to add a new exercise, gets array of exercises from ExeService, displays it with ExeDetail component.
// Listens to deleteExe event on ExeDetail component, on this event, calls ExeServies, delete method passing index extracted from event
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'My Gym Log';
  loggedIn: boolean;
  subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit () {
    this.subscription = this.authService.loggedInStatus.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.checkLSToken();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  //gets auth token from local storage, check validity and decides login status accordingly
  checkLSToken() {
    //CHECK IF THERE IS NO TOKEN!!!
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
    this.authService.setValidToken(token, expiresIn);

  }
}
