import {Injectable, NgModule} from "@angular/core";
import User from "../models/User";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {S3Service} from "./s3.service";
import {CustomErrorHandlerService} from "./custom-error-handler.service";

@Injectable()
export class UserService {
  private user: User;

  constructor(
    public http: HttpClient,
    public s3: S3Service,
    public errorHandler: CustomErrorHandlerService
  ) { }

  public getMyInfo(): Observable<User> {
    return new Observable<User>(observer => {
        this.http.get(`${environment.api}/user/info`).subscribe((response: any) => {
          this.user = response.body.user;
          observer.next(this.user);
        }, error => {
          this.errorHandler.handleError(error);
        });
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

  public getUserInfo(id: string): Observable<any> {
    return new Observable<any>(observer => {
      this.http.get(`${environment.api}/user/${id}`).subscribe((response: any) => {
        this.user = response.body.user;
        observer.next(this.user);
      });
    });
  }

  public getMany(ids: string[]): Observable<any> {
    return this.http.post(`${environment.api}/user/getMany`, ids);
  }

  public getTargetUser(): User {
    return this.user;
  }
}

export function UserFactory(http: HttpClient, s3: S3Service, errorHandler: CustomErrorHandlerService) {
  return new UserService(http, s3, errorHandler);
}

@NgModule({
  providers: [{
    provide: UserService,
    useFactory: UserFactory,
    deps: [HttpClient, S3Service, CustomErrorHandlerService]
  }]
})
export class UserModule {}
