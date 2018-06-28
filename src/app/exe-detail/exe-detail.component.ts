import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exe} from '../exe';

// Contains template for displaying individual exercise that is passed down from AppComponent via @Input. On clicking delete icon, emits
// event with index of exercise to be deleted
@Component({
  selector: 'app-exe-detail',
  templateUrl: './exe-detail.component.html',
  styleUrls: ['./exe-detail.component.css']
})
export class ExeDetailComponent implements OnInit {
  @Input('detailedExe') exe: Exe;
  @Input('ExeIndex') index: number;
  @Output() deleteExe: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }


  ngOnInit() {}

  onDeleteExe() {
    this.deleteExe.emit(this.index);
  }


}
