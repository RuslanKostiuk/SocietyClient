import {RouterModule, Routes} from "@angular/router";
import {AuthRegistrationComponent} from "./components/auth-registration/auth-registration.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ProfileComponent} from "./components/profile/profile.component";
import {EventComponent} from "./components/event/event.component";

const routes: Routes = [
  {
    path: "login",
    component: AuthRegistrationComponent
  },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "events",
        component: EventComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }
];

export let router = RouterModule.forRoot(routes);
