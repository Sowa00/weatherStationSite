import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['loginUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['setAuthenticated']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginUser method of UserService when form is valid', () => {
    const loginFormValue = { email: 'test@example.com', password: 'password' };
    userService.loginUser.and.returnValue(of({}));
    component.loginForm.patchValue(loginFormValue);
    component.onSubmit();
    expect(userService.loginUser).toHaveBeenCalledWith(loginFormValue);
  });

  it('should set authenticated flag and navigate to home page on successful login', () => {
    const loginFormValue = { email: 'test@example.com', password: 'password' };
    userService.loginUser.and.returnValue(of({}));
    component.loginForm.patchValue(loginFormValue);
    component.onSubmit();
    expect(authService.setAuthenticated).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['/', 'current-weather']);
  });

  it('should set error message on 401 error', () => {
    const error = { status: 401 };
    userService.loginUser.and.returnValue(throwError(error));
    component.loginForm.patchValue({ email: 'test@example.com', password: 'password' });
    component.onSubmit();
    expect(component.errorMessage).toEqual('Invalid login credentials.');
  });

  it('should set error message on other errors', () => {
    const error = { status: 500 };
    userService.loginUser.and.returnValue(throwError(error));
    component.loginForm.patchValue({ email: 'test@example.com', password: 'password' });
    component.onSubmit();
    expect(component.errorMessage).toEqual('Nieprawidłowe dane.');
  });
});
