import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UserService} from "../../../services/user.service";
import User from "../../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: "app-user-likes",
  templateUrl: "./user-likes.component.html",
  styleUrls: ["./user-likes.component.scss"]
})
export class UserLikesComponent implements OnInit {
  public users: User[];
  constructor(
    public dialogRef: MatDialogRef<UserLikesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    const usersIds: string[] = this.data;
    this.userService.getMany(usersIds).subscribe(response => {
      this.users = response.body;
    });
  }

  public navigateLikeAuthor(userId: string): void {
    this.router.navigate([`/user/${userId}`]);
    this.dialogRef.close();
  }
}
