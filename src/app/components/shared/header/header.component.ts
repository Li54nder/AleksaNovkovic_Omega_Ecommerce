import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BSubjectUserService } from 'src/app/services/b-subject-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User | undefined;

  constructor(
    private router: Router,
    private userSubject: BSubjectUserService
  ) {}

  ngOnInit() {
    this.userSubject.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.setUser(undefined);
    this.router.navigate(['login']);
  }

  login() {
    this.router.navigate(['login']);
  }
}
