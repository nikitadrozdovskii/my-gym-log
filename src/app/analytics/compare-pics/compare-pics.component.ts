import { Component, OnInit } from '@angular/core';
import { ExeService } from '../../exe.service';

@Component({
  selector: 'app-compare-pics',
  templateUrl: './compare-pics.component.html',
  styleUrls: ['./compare-pics.component.css']
})
export class ComparePicsComponent implements OnInit {
  imageUrl1;
  imageUrl2;
  date1;
  date2;

  constructor(private exeService: ExeService) { }

  ngOnInit() {
  }

  fetchPicture(event){
    const date = event.target.value;
    const inputNum = event.target.id;
    this.exeService.getImageFromServer(date);
    const subscription = this.exeService.imageUpdated.subscribe((imagePath) => {
      if (+inputNum === 1){
        this.date1 = date;
        this.imageUrl1 = imagePath;
      } else {
        this.imageUrl2 = imagePath;
        this.date2 = date;
      }
      subscription.unsubscribe();
    });

  }

}
