import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.errorMessage = undefined;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.userService.loginUser(formData).subscribe(
        (response) => {
          console.log('Login response:', response);

          console.log('Before navigate');
          this.authService.setAuthenticated(true);
          this.router.navigate(['/', 'current-weather']);
          console.log('After navigate');
        },
        (error) => {
          console.error('Login error:', error);

          if (error.status === 401) {
            console.log('Invalid login credentials.');
            this.errorMessage = 'Invalid login credentials.';
          } else {

            console.error('Other login error.');
            this.errorMessage = 'Nieprawidłowe dane.';
          }
        }
      );
    }
  }


}
