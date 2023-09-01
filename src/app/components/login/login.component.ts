import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BSubjectUserService } from 'src/app/services/b-subject-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userSubject: BSubjectUserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['kminchelle', Validators.required],
      password: ['0lelplR', Validators.required],
    });
  }

  formSubmit() {
    this.authService
      .login(this.form.value.username, this.form.value.password)
      .subscribe({
        next: (res) => {
          this.userSubject.setUser(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/']);
          this.snackBar.open('Logged in successfully.');
        },
        error: _ => {
          this.snackBar.open('Unsuccessful login! Check your credentials.');
        },
      });
  }
}
