import {Component, OnInit} from '@angular/core';
import {Exe} from './exe';
import {ExeService} from './exe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Gym Log';
  exes: Exe[] = [];
  constructor(private exeService: ExeService) {
    this.exes = exeService.exes;
  }
}
