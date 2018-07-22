import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exe } from '../exe';
import {ExeService} from '../exe.service';

@Component({
  selector: 'app-save-the-day',
  templateUrl: './save-the-day.component.html',
  styleUrls: ['./save-the-day.component.css']
})
export class SaveTheDayComponent implements OnInit, OnDestroy {

  exes: Exe[] = [];
  serverErrorMessage: string = null;
  date: string;
  subscription1;
  subscription2;

  constructor(private exeService: ExeService) {
  }

  ngOnInit () {
    this.exeService.getExesFromServer(this.date);
    this.subscription1 =this.exeService.exesUpdated.subscribe(() => {
      this.exes = this.exeService.getExes();
    });

    this.subscription2 = this.exeService.serverErrored.subscribe((errorMessage) => {
      this.serverErrorMessage = errorMessage;
      setTimeout(() => {
        this.serverErrorMessage = null;
      },3000);
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();

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
