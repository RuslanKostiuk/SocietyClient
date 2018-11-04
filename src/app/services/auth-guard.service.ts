import {Injectable, NgModule} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class AuthGuardService {

  constructor(private router: Router) { }

  public canActivate(): boolean {
    if (localStorage.getItem("accessToken")) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}

export function AuthGuardFactory (router: Router) {
  return new AuthGuardService(router);
}

@NgModule({
  providers: [
    {
      provide: AuthGuardService,
      useFactory: AuthGuardFactory,
      deps: [Router]
    }
  ]
})

export class AuthGuardModule {}
