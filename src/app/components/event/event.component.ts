import { Component, OnInit } from "@angular/core";
import {MatDialog} from "@angular/material";
import {AddEventComponent} from "../modals/add-event/add-event.component";
import Event from "../../models/Event";
import {EventService} from "../../services/event.service";
import {CustomErrorHandlerService} from "../../services/custom-error-handler.service";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  public events: Event[];

  constructor(
    public changePhotoDialog: MatDialog,
    public eventService: EventService,
    public errorHandler: CustomErrorHandlerService
  ) { }

  ngOnInit() {
   this.eventService
     .getMany("10", "0")
     .subscribe((response) => {
       this.events = response.body;
     }, error => {
      this.errorHandler.handleError(error);
    });
  }

  public addEvent(): void {
    this.changePhotoDialog.open(AddEventComponent, {
      height: "90%",
      width: "60%"
    });
  }

}
