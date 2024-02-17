import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['registerUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page upon successful registration', () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
      password2: 'password123',
      firstName: 'name',
      lastName: 'lname'
    };

    userServiceSpy.registerUser.and.returnValue(of({ status: 200 }));

    component.registrationForm.setValue(formData);
    component.onSubmit();

    expect(userServiceSpy.registerUser).toHaveBeenCalledWith(formData);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set error message for email in use', () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
      password2: 'password123',
      firstName: 'name',
      lastName: 'lname'
    };

    userServiceSpy.registerUser.and.returnValue(throwError({ status: 409 }));

    component.registrationForm.setValue(formData);
    component.onSubmit();

    expect(userServiceSpy.registerUser).toHaveBeenCalledWith(formData);
    expect(component.errorMessage).toBe('Adres e-mail w użyciu, prosze użyć innego.');
  });

  it('should set error message for other registration errors', () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
      password2: 'password123',
      firstName: 'name',
      lastName: 'lname'
    };

    userServiceSpy.registerUser.and.returnValue(throwError({ status: 500 }));

    component.registrationForm.setValue(formData);
    component.onSubmit();

    expect(userServiceSpy.registerUser).toHaveBeenCalledWith(formData);
    expect(component.errorMessage).toBe('Błąd rejestracji. Spróbuj ponownie.');
  });
});
