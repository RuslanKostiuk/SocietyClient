import { Component, OnInit } from "@angular/core";
import {UserService} from "../../services/user.service";
import User from "../../models/User";
import {CustomErrorHandlerService} from "../../services/custom-error-handler.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public user: User;
  constructor(
    public userService: UserService,
    public errorHandler: CustomErrorHandlerService
  ) { }

  ngOnInit() {
    this.userService.getMyInfo().subscribe(user => {
      this.user = user;
    }, error => {
      this.errorHandler.handleError(error);
    });
  }

}
