import {Component, Inject, OnInit} from "@angular/core";
import {ImageCroppedEvent} from "ngx-image-cropper/src/image-cropper.component";
import {UserService} from "../../../services/user.service";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: "app-change-photo",
  templateUrl: "./change-photo.component.html",
  styleUrls: ["./change-photo.component.scss"]
})
export class ChangePhotoComponent implements OnInit {
  public imageChangedEvent: any = "";
  public croppedImage: any = "";
  public isImageLoaded: boolean = false;
  private file: Blob;

  constructor(public userService: UserService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.isImageLoaded = true;
  }
  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.file = event.file;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  public saveFile() {
    if (this.file) {
      this.userService.saveAvatar(this.file).subscribe(response => {
        this.data.user.avatar = response;
        this.userService.updateUser({avatar: response}).toPromise();
      });
    }
  }
}
