import { Component, OnInit } from "@angular/core";
import {MatDialog} from "@angular/material";
import {AddEventComponent} from "../modals/add-event/add-event.component";
import Event from "../../models/Event";
import {EventService} from "../../services/event.service";
import {CustomErrorHandlerService} from "../../services/custom-error-handler.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import User from "../../models/User";
import {SessionService} from "../../services/session.service";
import {UserLikesComponent} from "../modals/user-likes/user-likes.component";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  public events: Event[];
  public me: User;
  public showAddButton: boolean;

  constructor(
    public addEventDialog: MatDialog,
    public showUserLikes: MatDialog,
    public eventService: EventService,
    public errorHandler: CustomErrorHandlerService,
    public router: Router,
    public userService: UserService,
    public session: SessionService
  ) { }

  ngOnInit() {
    this.load();
  }

  public addEvent(): void {
    const dialogRef = this.addEventDialog.open(AddEventComponent, {
      height: "90%",
      width: "60%"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.load();
    });
  }

  public addLike(event: Event): void {
    const userId: string = this.session.user._id;

    if (!event.likes) {
      event.likes = [];
    }

    const position: number = event.likes.indexOf(userId);
    if (position === -1) {
      event.likes.push(userId);
    } else {
      event.likes.splice(position, 1);
    }

    this.eventService.udpate(event).toPromise();
  }

  public showLikers(event): void {
    this.showUserLikes.open(UserLikesComponent, {
      height: "90%",
      width: "40%",
      data: event.likes
    });
  }

  private load(): void {
    const user: User = this.userService.getTargetUser();
    this.me = this.session.user;
    const isEventRoute: boolean = this.router.url === "/events";
    const filter: any = isEventRoute ? {} : {userId: user._id};
    this.showAddButton = isEventRoute ? true : this.me._id === user._id;
    this.eventService
      .getMany(filter, "10", "0")
      .subscribe((response) => {
        this.events = response.body;
      }, error => {
        this.errorHandler.handleError(error);
      });
  }
}
