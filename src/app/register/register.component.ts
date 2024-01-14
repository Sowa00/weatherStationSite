import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      // Wywołanie metody registerUser z UserService
      this.userService.registerUser(formData).subscribe(
        (response) => {
          if (response.status === 200) {
            // Odpowiedź z kodem 200 oznacza sukces
            console.log('Registration successful!', response);
          } else {
            console.log('Unexpected response status:', response.status);
          }

          // Dodaj kod obsługujący sukces rejestracji, np. przekierowanie na inną stronę
          // Możesz użyć routera Angular, aby przekierować użytkownika po udanej rejestracji
          // Przykładowo:
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed!', error);

          // Sprawdź, czy status odpowiedzi to 409 (Conflict)
          if (error.status === 200) {
            // Adres e-mail jest już w użyciu
            console.log('Registration successful!', error);
            this.errorMessage = 'Registration successful!';
            this.router.navigate(['/login']);
          }
          else if (error.status === 409) {
            // Adres e-mail jest już w użyciu
            console.log('Email address is already in use.');
            this.errorMessage = 'Email address is already in use.';
          } else {
            // Obsługa innych błędów
            console.log('Other registration error.');
            // Dodaj kod obsługujący inne błędy, jeśli są
          }
        }
      );
    }
  }
}
