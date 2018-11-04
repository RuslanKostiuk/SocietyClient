import {AbstractControl, ValidatorFn, Validators} from "@angular/forms";
import User from "../models/User";

export class CustomValidators {
  public static matchPasswords(user: User): ValidatorFn {
    return  (control: AbstractControl): {[key: string]: boolean} => {
      if (user.password !== control.value) {
        return {matchPassword: true};
      }
      return null;
    };
  }
}

