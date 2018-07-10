import { Component, OnInit, Input } from '@angular/core';
import { ExeService } from '../exe.service';

@Component({
  selector: 'app-prog-pic',
  templateUrl: './prog-pic.component.html',
  styleUrls: ['./prog-pic.component.css']
})
export class ProgPicComponent implements OnInit {

  @Input ('picDate') date : string; 
  imageFile;
  imageUrl: string;
  imageWidth: string;
  imageHeight: string;
  aspectRatio: number;
  constructor(private exeService: ExeService) { }

  ngOnInit() {
    this.exeService.imageUpdated.subscribe((imagePath) => {
      this.imageUrl = imagePath;
    });
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
    this.imageFile=file;
    reader.readAsDataURL(file); 
  }

  uploadImage() {
    this.exeService.uploadImage(this.imageFile, this.date);
  }

}
