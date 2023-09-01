import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: () => {}, // spy for login method
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'), // spy for navigate method
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: jasmine.createSpy('open'), // spy for open method
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initialized login form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('username')?.value).toBe('kminchelle'); // Check initial value for username
    expect(component.form.get('password')?.value).toBe('0lelplR'); // Check initial value for password
  });

  it('should handle form submission with valid credentials', () => {
    const mockResponse = {
      "id": 15,
      "username": "kminchelle",
      "email": "kminchelle@qq.com",
      "firstName": "Jeanne",
      "lastName": "Halvorson",
      "gender": "female",
      "image": "https://robohash.org/autquiaut.png?size=50x50&set=set1",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs"
    };
    spyOn(authService, 'login').and.returnValue(of(mockResponse));

    component.form.setValue({ username: 'kminchelle', password: '0lelplR' });

    component.formSubmit();

    expect(authService.login).toHaveBeenCalledWith('testUser', 'testPassword');
    expect(localStorage.getItem('token')).toBe('mockToken');
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse));
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(snackBar.open).toHaveBeenCalledWith('Logged in successfully.');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
