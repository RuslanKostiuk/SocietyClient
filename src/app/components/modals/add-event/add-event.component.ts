import { Component, OnInit } from "@angular/core";
import Event from "../../../models/Event";
import {EventService} from "../../../services/event.service";
import {S3Service} from "../../../services/s3.service";
import {UserService} from "../../../services/user.service";
import User from "../../../models/User";
import Photo from "../../../models/Photo";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.scss"]
})
export class AddEventComponent implements OnInit {
  public event: Event;
  public files: File[];
  public previews: any[];

  constructor(
    public eventService: EventService,
    public s3: S3Service,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.event = new Event();
    this.previews = [];
  }

  public save(): void {
    this.userService.getUserInfo().subscribe(async user => {
      const pathes = await this.s3.saveItems(this.files, user._id);
      this.event.photos = pathes.map(path => {
        const photo: Photo = new Photo();
        photo.path = path;
        return photo;
      });

      this.eventService.save(this.event).subscribe(event => {
        this.event = event;
      });
    });
  }

  public handleFileInput(files: any[]): void {
    if (files && files.length) {
      this.files = files;
      for (let i: number = 0; i < this.files.length; i++) {
        const item: any = this.files[i];
        const reader: FileReader = new FileReader();
        reader.onload = e => {
          this.previews.push(reader.result);
        };
        reader.readAsDataURL(item);
      }
    }
  }
}
