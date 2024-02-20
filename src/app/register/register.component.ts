import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
      password2: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const emailControl = this.registrationForm.get('email');
      const passwordControl = this.registrationForm.get('password');
      const password2Control = this.registrationForm.get('password2');

      if (emailControl && passwordControl && password2Control) {
        const formData = this.registrationForm.value;

        this.userService.registerUser(formData).subscribe(
          (response) => {
            if (response.status === 200) {
              console.log('Zarejestrowano pomyślnie!', response);
              this.router.navigate(['/login']);
            } else {
              console.log('Niespodziewany błąd rejestracji:', response.status);
            }
          },
          (error) => {
            console.error('Błąd rejestracji!', error);
            if (error.status === 200) {
              this.errorMessage = 'Zarejestrowanie pomyślnie!';
              this.router.navigate(['/login']);
            } else if (error.status === 409) {
              this.errorMessage = 'Adres e-mail w użyciu, prosze użyć innego.';
            } else {
              this.errorMessage = 'Błąd rejestracji. Spróbuj ponownie.';
            }
          }
        );
      }
    }
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const password2 = control.get('password2');

    if (password && password2 && password.value === password2.value) {
      return null;
    }
    return { 'passwordMismatch': true };
  }
}
