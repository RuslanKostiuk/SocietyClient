import {Inject, Injectable, NgModule} from "@angular/core";
import { Socket } from "ngx-socket-io";
import {environment} from "../../environments/environment";

@Injectable()
export class SocketService extends Socket {

  constructor(@Inject("_OPTIONS_") private options) {
    super({ url: environment.socket, options });
  }
}

@NgModule({
  providers: [SocketService, {
      provide: "_OPTIONS_",
      useValue: {
        query: `token=${localStorage.getItem("accessToken")}`
      }
    }
  ]
})
export class SocketModule {}
