import { Component, OnInit } from "@angular/core";
import {UserService} from "../../services/user.service";
import User from "../../models/User";
import {CustomErrorHandlerService} from "../../services/custom-error-handler.service";
import {MatDialog} from "@angular/material";
import {ChangePhotoComponent} from "../modals/change-photo/change-photo.component";

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
    public errorHandler: CustomErrorHandlerService,
    public changePhotoDialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(response => {
      this.user = response;
    }, error => {
      this.errorHandler.handleError(error);
    });
  }

  public openDialog(): void {
    const dialogRef = this.changePhotoDialog.open(ChangePhotoComponent, {
      height: "90%",
      width: "60%",
      data: {user: this.user}
    });
  }
}
