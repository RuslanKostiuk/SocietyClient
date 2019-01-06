import {Injectable, NgModule} from "@angular/core";
import User from "../models/User";
import {UserService} from "./user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class SessionService {
  private _sessionData: any;
  constructor() {}

  public async init(): Promise<void> {
    const token: string = localStorage.getItem("accessToken");

    if (token) {
      this._sessionData = {};
      const helper: JwtHelperService = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this._sessionData.userId = decodedToken.id;
    }
  }
  public close(): void {
    this._sessionData = null;
  }

  public get sessionData(): any {
    if (!this._sessionData) {
      this.init();
    }
    return this._sessionData;
  }
}
export function SessionFactory(): SessionService {
  return new SessionService();
}

@NgModule({
  providers: [{
    provide: SessionService,
    useFactory: SessionFactory
  }]
})
export class SessionModule {}
