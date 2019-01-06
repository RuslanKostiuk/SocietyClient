import { Component } from "@angular/core";
import {UserService} from "./services/user.service";
import {fromEvent, merge, Observable, of} from "rxjs";
import { mapTo } from "rxjs/operators";
import {SocketService} from "./services/socket.service";
import {SessionService} from "./services/session.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  private online$: Observable<boolean>;

  constructor(
    private socket: SocketService,
    private session: SessionService
  ) {
    this.session.init();
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, "load").pipe(mapTo(true)),
      fromEvent(window, "unload").pipe(mapTo(false))
    );

    this.online$.subscribe(isConnected => {
      if (localStorage.getItem("refreshToken")) {
        try {
          const userId: string = this.session.sessionData.userId;
          this.socket.emit("connection-status", {
            isConnected, userId
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
}
