import {Injectable, NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, BehaviorSubject } from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthRegistrationService} from "../services/auth-registration.service";
import {Router} from "@angular/router";
import {filter, switchMap, take} from "rxjs/internal/operators";

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    public authRegSerivce: AuthRegistrationService,
    private router: Router
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const nonAuthRoutes = ["/signIn", "/signUp", "/verify", "/token/refresh"];

    if (nonAuthRoutes.includes(new URL(request.url).pathname)) {
      return next.handle(request);
    } else {
      const helper: JwtHelperService = new JwtHelperService();

      if (helper.isTokenExpired(localStorage.getItem("accessToken"))) {
        return this.refreshToken(request, next);
      }

      return next.handle(request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }));
    }
  }

  private	refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken: string = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      this.router.navigate(["login"]);
    } else {
      if (this.refreshTokenInProgress) {
        return this.refreshTokenSubject.pipe(
          filter(token => {
            return token != null;
          }),
          take(1),
          switchMap(token => {
            return next.handle(this.setAccessToken(request, next, token));
          })
        );
      } else {
        this.refreshTokenInProgress = true;
        // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
        this.refreshTokenSubject.next(null);

        return this.authRegSerivce.refreshToken(refreshToken).pipe(
          switchMap(response => {
            if (response && response.body) {
              const tokens: any = response.body;
              const accessToken: string = tokens.token;
              const newRefreshToken: string = tokens.refreshToken;

              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", newRefreshToken);
              this.refreshTokenSubject.next(accessToken);

              return next.handle(this.setAccessToken(request, next, accessToken));
            } else {
              this.router.navigate(["login"]);
            }
          })
        );

      }
    }
  }

  private setAccessToken(request: HttpRequest<any>, next: HttpHandler, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
  }
}

export function JwtInterceptorFactoty(authRegSerivce: AuthRegistrationService, router: Router) {
  return new JwtInterceptorService(authRegSerivce, router);
}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useFactory: JwtInterceptorFactoty,
    deps: [AuthRegistrationService, Router],
    multi: true
  }]
})
export class JwtInterceptorModule {}
