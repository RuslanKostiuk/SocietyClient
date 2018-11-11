import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";


import { AppComponent } from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {AuthRegistrationModule} from "./services/auth-registration.service";
import { AuthRegistrationComponent } from "./components/auth-registration/auth-registration.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {router} from "./app.routes";
import { HomeComponent } from "./components/home/home.component";
import {AuthGuardModule} from "./services/auth-guard.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LayoutModule} from "@angular/cdk/layout";
import {materialModules} from "./app.material";
import {JwtInterceptorModule} from "./interceptors/jwt-interceptor.service";
import {UserModule} from "./services/user.service";
import { ProfileComponent } from "./components/profile/profile.component";
import { EventComponent } from "./components/event/event.component";
import {CustomErrorHandlerModule} from "./services/custom-error-handler.service";
import { ChangePhotoComponent } from "./components/modals/change-photo/change-photo.component";
import {ImageCropperModule} from "ngx-image-cropper";
import {S3Module} from "./services/s3.service";

@NgModule({
  declarations: [
    AppComponent,
    AuthRegistrationComponent,
    HomeComponent,
    ProfileComponent,
    EventComponent,
    ChangePhotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthRegistrationModule,
    AngularFontAwesomeModule,
    FormsModule,
    router,
    AuthGuardModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: "never"}),
    ...materialModules,
    JwtInterceptorModule,
    UserModule,
    CustomErrorHandlerModule,
    ImageCropperModule,
    S3Module
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ChangePhotoComponent
  ]
})
export class AppModule { }
