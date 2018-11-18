import {ErrorHandler, Injectable, NgModule} from "@angular/core";
import {ErrorStatuses} from "../shared/enums";
import {MatDialog} from "@angular/material";
import {ErrorModalComponent} from "../components/modals/error-modal/error-modal.component";

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

  constructor(public errorDialog: MatDialog) {
  }

  handleError(error: any): void {
    switch (true) {
      case ErrorStatuses.dbError === error.errorStatus:
      case ErrorStatuses.s3Error === error.errorStatus:
      case ErrorStatuses.unknown === error.errorStatus:
      case error.status === 500:
        this.errorDialog.open(ErrorModalComponent);
        break;
      default:
        console.log(error);
        break;
    }
  }
}

function CustomErrorHandlerFactory(errorDialog: MatDialog) {
 return new CustomErrorHandlerService(errorDialog);
}

@NgModule({
  providers: [
    {
      provide: CustomErrorHandlerService,
      useFactory: CustomErrorHandlerFactory,
      deps: [MatDialog]
    }
  ]
})

export class CustomErrorHandlerModule {}
