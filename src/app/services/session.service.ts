import {Injectable, NgModule} from "@angular/core";
import User from "../models/User";
import {UserService} from "./user.service";

@Injectable()
export class SessionService {
  private _user: User;
  constructor(
    public userService: UserService
  ) {}

  public async init(): Promise<void> {
    if (!this._user) {
      this.userService.getMyInfo().subscribe(user => {
        this._user = user;
      });
    }
  }

  public close(): void {
    this._user = null;
  }

  public get user(): User {
    if (!this._user) {
      this.init();
    }
    return this._user;
  }
}
export function SessionFactory(userService: UserService): SessionService {
  return new SessionService(userService);
}

@NgModule({
  providers: [{
    provide: SessionService,
    useFactory: SessionFactory,
    deps: [UserService]
  }]
})
export class SessionModule {}
