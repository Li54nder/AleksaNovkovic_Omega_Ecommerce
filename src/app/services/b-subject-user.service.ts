import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class BSubjectUserService {
  private user = new BehaviorSubject<User | undefined>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') + '')
      : undefined
  );
  currentUser = this.user.asObservable();

  constructor() {}

  setUser(user: User | undefined) {
    this.user.next(user);
  }
}
