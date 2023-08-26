import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['kminchelle', Validators.required],
      password: ['0lelplR', Validators.required]
    })
    // if(localStorage.getItem("token")) {
    //   this.router.navigate(['portal']);
    // }
  }

  formSubmit() {
    this.authService.login(this.form.value.username, this.form.value.password).pipe(
      // this.toast.observe({
      //   loading: "Prijavljivanje u toku...",
      //   success: "Kredencijali su validni!",
      //   error: "Neuspešna prijava!"
      // })
    ).subscribe({
      next: res => {
        console.log(res);

        localStorage.setItem('token', res["token"]);
        // this.router.navigate(['/portal']);
      },
      error: err => {
        // this.loading = false;
        console.log(err);

      }
    })
  }
}
