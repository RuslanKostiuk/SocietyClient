import {Injectable, NgModule} from "@angular/core";
import User from "../models/User";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {
  private user: User;

  constructor(public http: HttpClient) { }

  public getUserInfo(): Observable<User> {
    return new Observable<User>(observer => {
      // if (this.user) {
      //
      //   observer.next(this.user);
      //   observer.complete();
      // } else {
        this.http.get(`${environment.api}/user/info`).subscribe((response: any) => {
          this.user = response.body.user;
          observer.next(this.user);
        });
      // }
    });
  }
}

export function UserFactory(http: HttpClient) {
  return new UserService(http);
}

@NgModule({
  providers: [{
    provide: UserService,
    useFactory: UserFactory,
    deps: [HttpClient]
  }]
})
export class UserModule {}
