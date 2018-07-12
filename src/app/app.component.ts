import {Component, OnInit} from '@angular/core';
import {Exe} from './exe';
import {ExeService} from './exe.service';

// Hosts AddExe component with form to add a new exercise, gets array of exercises from ExeService, displays it with ExeDetail component.
// Listens to deleteExe event on ExeDetail component, on this event, calls ExeServies, delete method passing index extracted from event
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'My Gym Log';

  constructor(private exeService: ExeService) {
  }

  ngOnInit () {
    
  }
}
