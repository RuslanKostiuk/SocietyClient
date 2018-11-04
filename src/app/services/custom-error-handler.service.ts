import {ErrorHandler, Injectable} from "@angular/core";

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

  constructor() {
  }

  handleError(error: any): void {
    if (error.status && error.status >= 500) {
      // TODO: add modal window
      console.error(error);
    }
  }
}
