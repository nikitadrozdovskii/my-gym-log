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
  constructor() { }

  ngOnInit() {
  }

  onImagePicked(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const image = new Image;
      this.imageUrl = reader.result;
      image.onload = () => {
        // alert(image.width);
        this.imageWidth = String(image.width) + 'px';
        this.imageHeight = String(image.height) + 'px';
        console.log(this.imageWidth);
        console.log(this.imageHeight);
      }
      image.src = this.imageUrl;
    };
    reader.readAsDataURL(file); 
  }


}
