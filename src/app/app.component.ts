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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
