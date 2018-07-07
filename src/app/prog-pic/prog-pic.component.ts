import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prog-pic',
  templateUrl: './prog-pic.component.html',
  styleUrls: ['./prog-pic.component.css']
})
export class ProgPicComponent implements OnInit {

  imageUrl: string;
  imageWidth: string;
  imageHeight: string;
  aspectRatio: number;
  constructor() { }

  ngOnInit() {
  }

  onImagePicked(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const image = new Image;
      this.imageUrl = reader.result;
    //   image.onload = () => {
    //     //get dimensions of image
    //     console.log(this.imageHeight);
    //     console.log(this.imageWidth);
    //   }
      image.src = this.imageUrl;
    };
    reader.readAsDataURL(file); 
  }


}
