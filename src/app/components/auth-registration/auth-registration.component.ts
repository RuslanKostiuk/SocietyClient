import { Component, OnInit } from "@angular/core";
import {AuthRegistrationService} from "../../services/auth-registration.service";
import User from "../../models/User";
import {Genders} from "../../shared/enums";
import {objectToArray} from "../../shared/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../shared/Validators";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {CustomErrorHandlerService} from "../../services/custom-error-handler.service";

@Component({
  selector: "app-auth-registration",
  templateUrl: "./auth-registration.component.html",
  styleUrls: ["./auth-registration.component.scss"]
})

export class AuthRegistrationComponent implements OnInit {
  private minPasswordLength: number = 6;
  public user: User = new User();
  public genders: string[];
  public verificationCode: string;
  public authData: {email: string, password: string} = {
    email: "",
    password: ""
  };
  public message: string = "";
  public isEmailSended: boolean = false;
  public isEmailVerified: boolean = false;
  public isEditable: boolean = true;
  public authRegGroup: FormGroup;
  public step1: FormGroup;
  public step2: FormGroup;
  public step3: FormGroup;

  constructor(
    public authReg: AuthRegistrationService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    public errorHandler: CustomErrorHandlerService
) {}

  ngOnInit() {
    this.genders = objectToArray(Genders);
    const refreshToken: string = localStorage.getItem("refreshToken");
    if (refreshToken) {
      this.authReg.signOut(refreshToken).toPromise();
    }

    localStorage.clear();
    this.authRegGroup = this._formBuilder.group({
      authEmail: ["", [Validators.required, Validators.email]],
      authPassword: ["", [Validators.required, Validators.minLength(this.minPasswordLength)]]
    });
    this.step1 = this._formBuilder.group({
      step1Email: ["", [Validators.required, Validators.email]],
      step1Password: ["", [Validators.required, Validators.minLength(this.minPasswordLength)]],
      step1ConfirmPassword: ["", [Validators.required, CustomValidators.matchPasswords(this.user)]],
      step1FirstName: ["", Validators.required],
      step1LastName: ["", Validators.required]
    });
    this.step2 = this._formBuilder.group({
      step2Gender: [""],
      step2DOB: [""],
      step2City: [""],
      step2Street: [""],
      step2HouseNumber: [""]
    });
    this.step3 = this._formBuilder.group({
      step3Verification: ["", Validators.required]
    });
  }

  private signIn(): void {
    this.authReg
      .authenticate(this.authData)
      .subscribe((response) => {
        localStorage.setItem("accessToken", response.body.token);
        localStorage.setItem("refreshToken", response.body.refreshToken);
        this.router.navigate(["/"]);
      }, error => {
        this.errorHandler.handleError(error);
      });
  }

  private signUp(): void {
    if (this.step1.valid) {
      this.user.avatar = "https://thevillageofkairos.com/wp-content/uploads/2016/06/team-man-placeholder.jpg";
      this.authReg
        .registration(this.user)
        .subscribe((response) => {
          if (response.body === "SENT") {
            this.isEmailSended = true;
          }
        }, error => {
          this.errorHandler.handleError(error);
        });
    }
  }

  private verify(): void {
    if (this.verificationCode) {
      this.authReg.verify(this.user.email, this.verificationCode).subscribe((response) => {
        localStorage.setItem("accessToken", response.body.token);
        localStorage.setItem("refreshToken", response.body.refreshToken);
        this.router.navigate(["/"]);
      }, error => {
        this.errorHandler.handleError(error);
        this.message = error.message;
        this.openSnackBar();
      });
    }
  }

  private selectionChange(event): void {
    if (event.selectedIndex === 2) {
      this.signUp();
      this.isEditable = false;
    }
  }

  openSnackBar() {
    this.snackBar.open("Error", this.message, {
      duration: 2000
    });
  }
}
