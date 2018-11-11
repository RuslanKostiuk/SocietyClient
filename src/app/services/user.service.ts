import {Injectable, NgModule} from "@angular/core";
import User from "../models/User";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {S3Service} from "./s3.service";

@Injectable()
export class UserService {
  private user: User;

  constructor(
    public http: HttpClient,
    public s3: S3Service
  ) { }

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

  public saveAvatar(file: Blob): Observable<any> {
    return new Observable<string>(observer => {
      this.s3.saveItem(file, this.user._id)
        .then(path => {
          observer.next(path);
        });
    });
  }

  public updateUser(user: any): Observable<any> {
    return this.http.post(`${environment.api}/user/update`, user);
  }
}

export function UserFactory(http: HttpClient, s3: S3Service) {
  return new UserService(http, s3);
}

@NgModule({
  providers: [{
    provide: UserService,
    useFactory: UserFactory,
    deps: [HttpClient, S3Service]
  }]
})
export class UserModule {}
