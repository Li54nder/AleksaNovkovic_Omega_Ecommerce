import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;

  constructor() {}

  ngOnInit() {
    // TODO: check if token is valid
    this.loggedIn = !!localStorage.getItem('token');
  }

}
