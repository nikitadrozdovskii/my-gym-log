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
  exes: Exe[] = [];
  serverErrorMessage: string = null;
  private date: string;

  constructor(private exeService: ExeService) {
  }

  ngOnInit () {
    this.exeService.getExesFromServer(this.date);

    this.exeService.exesUpdated.subscribe(() => {
      this.exes = this.exeService.getExes();
    });

    this.exeService.serverErrored.subscribe((errorMessage) => {
      this.serverErrorMessage = errorMessage;
      setTimeout(() => {
        this.serverErrorMessage = null;
      },3000);
    });

  }

  onDeleteExe(index: number) {
    this.exeService.delete(this.date, this.exes[index]._id);
  }

  dateSelected (event) {
    this.date = event.target.value;
    this.exeService.getExesFromServer(this.date);
    this.exeService.getImageFromServer(this.date);
  }

}
