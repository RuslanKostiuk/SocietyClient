import {Injectable, NgModule} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import User from "../models/User";

@Injectable()
export class AuthRegistrationService {

  constructor(public http: HttpClient) { }

  public authenticate(params: {email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.api}/signIn`, params);
  }

  public registration(user: User): Observable<any> {
    return this.http.post(`${environment.api}/signUp`, user);
  }

  public verify(email: string, code: string): Observable<any> {
    return this.http.post(`${environment.api}/verify`, {email, code});
  }

  public refreshToken(token: string): Observable<any> {
    return this.http.post(`${environment.api}/token/refresh`, {token: token});
  }

  public signOut(token: string): Observable<any> {
    return this.http.post(`${environment.api}/signOut`, {token: token});
  }

}

function AuthRegistrationFactory(http: HttpClient) {
  return new AuthRegistrationService(http);
}

@NgModule({
  providers: [
    {
      provide: AuthRegistrationService,
      useFactory: AuthRegistrationFactory,
      deps: [HttpClient]
    }
  ]
})

export class AuthRegistrationModule {}
