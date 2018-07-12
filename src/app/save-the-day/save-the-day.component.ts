import { Component, OnInit } from '@angular/core';
import { Exe } from '../exe';
import {ExeService} from '../exe.service';

@Component({
  selector: 'app-save-the-day',
  templateUrl: './save-the-day.component.html',
  styleUrls: ['./save-the-day.component.css']
})
export class SaveTheDayComponent implements OnInit {

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
