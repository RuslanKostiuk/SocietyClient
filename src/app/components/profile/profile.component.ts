import { Component, OnInit } from "@angular/core";
import {UserService} from "../../services/user.service";
import User from "../../models/User";
import {parseHttpResponse} from "selenium-webdriver/http";
import {CustomErrorHandlerService} from "../../services/custom-error-handler.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(
    public userService: UserService,
    public errorHandler: CustomErrorHandlerService
  ) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(response => {
      this.user = response;
    }, error => {
      this.errorHandler.handleError(error);
    });
  }

}
