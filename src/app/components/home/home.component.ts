import { Component, OnInit } from "@angular/core";
import {UserService} from "../../services/user.service";
import User from "../../models/User";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public user: User;
  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(user => {
      this.user = user;
    });
  }

}
