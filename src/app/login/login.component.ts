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
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      // Wywołanie metody loginUser z UserService
      this.userService.loginUser(formData).subscribe(
        (response) => {
          console.log('Login response:', response);

          // Sprawdź, czy kod odpowiedzi to 200
          console.log('Before navigate');
          this.authService.setAuthenticated(true);
          this.router.navigate(['/', 'current-weather']);
          console.log('After navigate');
        },
        (error) => {
          console.error('Login error:', error);

          // Sprawdź, czy status odpowiedzi to 401 (Unauthorized)
          if (error.status === 401) {
            console.log('Invalid login credentials.');
            this.errorMessage = 'Invalid login credentials.';
          } else {
            // Jeśli status nie wynosi 401, oznacza to inne błędy
            console.error('Other login error.');
            this.errorMessage = 'Other login error.';
          }
        }
      );
    }
  }


}
