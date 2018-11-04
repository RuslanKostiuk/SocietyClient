import {ErrorHandler, Injectable, NgModule} from "@angular/core";
import {ErrorStatuses} from "../shared/enums";
import {AuthRegistrationService} from "./auth-registration.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

  constructor() {
  }

  handleError(error: any): void {
    switch (error.errorStatus) {
      case ErrorStatuses.dbError:
      case ErrorStatuses.s3Error:
      case ErrorStatuses.unknown:
        console.log(error);
        break;
      default:
        console.log(error);
        break;
    }
  }
}

function CustomErrorHandlerFactory() {
 return new CustomErrorHandlerService();
}

@NgModule({
  providers: [
    {
      provide: CustomErrorHandlerService,
      useFactory: CustomErrorHandlerFactory,
      deps: []
    }
  ]
})

export class CustomErrorHandlerModule {}
