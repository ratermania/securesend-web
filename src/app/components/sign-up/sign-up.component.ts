import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Signup } from "src/app/models/signup.model";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
})
export class SignupComponent {
    signup = new Signup();

    constructor(private router: Router, private snackbar: MatSnackBar, private userService: UserService) { }

    submit(event: Event) {
        this.userService.signup(this.signup).subscribe(response => {
            this.snackbar.open("Account created successfully.");
            this.router.navigate(['/']);
        });
    }
}