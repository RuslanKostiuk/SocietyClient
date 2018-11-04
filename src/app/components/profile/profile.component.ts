import { Component, OnInit } from "@angular/core";
import {UserService} from "../../services/user.service";
import User from "../../models/User";
import {parseHttpResponse} from "selenium-webdriver/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(response => {
      this.user = response;
    });
  }

}
