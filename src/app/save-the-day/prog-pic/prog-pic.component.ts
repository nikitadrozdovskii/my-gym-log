import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ExeService } from '../../exe.service';

@Component({
  selector: 'app-prog-pic',
  templateUrl: './prog-pic.component.html',
  styleUrls: ['./prog-pic.component.css']
})
export class ProgPicComponent implements OnInit, OnDestroy {

  @Input ('picDate') date : string; 
  imageFile;
  imageUrl: string;
  imageSavedMessage: string;
  subscription1;
  subscription2;

  constructor(private exeService: ExeService) { }

  ngOnInit() {
    this.subscription1 = this.exeService.imageUpdated.subscribe((imagePath) => {
      this.imageUrl = imagePath;
    });

    this.subscription2 = this.exeService.imageSaved.subscribe((message: string) => {
      if (message === 'deleted'){
        this.imageSavedMessage = 'Picture deleted';
        this.imageUrl = null;
      } else {
        this.imageSavedMessage = 'Picture saved!';
        this.imageFile = null;
      }
      setTimeout(() => {
        this.imageSavedMessage = null;
      },3000);
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  onImagePicked(event) {
    const file = event.target.files[0];
    if (file.size < 4000000){
      const reader = new FileReader();
  
      reader.onload = () => {
        const image = new Image;
        this.imageUrl = reader.result;
        image.src = this.imageUrl;
      };
      this.imageFile=file;
      reader.readAsDataURL(file); 
    } else {
      this.imageSavedMessage = "Chosen file too big, please select file under 4MB."
      setTimeout(()=>{
        this.imageSavedMessage = null;
      }, 3000);
    }

  }

  uploadImage() {
    this.exeService.uploadImage(this.imageFile, this.date);
  }

  deleteImage() {
    this.exeService.deleteImage(this.date);
  }

}
