import { Component, OnInit } from "@angular/core";
import {UserService} from "../../services/user.service";
import User from "../../models/User";
import {CustomErrorHandlerService} from "../../services/custom-error-handler.service";
import {MatDialog} from "@angular/material";
import {ChangePhotoComponent} from "../modals/change-photo/change-photo.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public user: User;
  public avatar: string;

  constructor(
    public userService: UserService,
    public changePhotoDialog: MatDialog,
    public errorHandler: CustomErrorHandlerService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    if (id) {
      this.getUserInfo(id);
    } else {
      this.load();
    }
  }

  public openDialog(): void {
    const dialogRef = this.changePhotoDialog.open(ChangePhotoComponent, {
      height: "90%",
      width: "60%",
      data: {user: this.user}
    });
  }

  private load(): void {
    this.userService.getMyInfo().subscribe(response => {
      this.user = response;
    }, error => {
      this.errorHandler.handleError(error);
    });
  }

  public getUserInfo(id: string): void {
     this.userService.getUserInfo(id).subscribe(user => {
      this.user = user;
    }, error => {
       this.errorHandler.handleError(error);
     });
  }
}
