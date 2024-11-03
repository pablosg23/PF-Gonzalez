import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {AuthData} from "../../models/AuthData";
import {User} from "../../models/User";
import {Router} from "@angular/router";

const FAKE_USER: User = {
  email: 'pablo@pablosg.ar',
  firstName: 'Pablo',
  lastName: 'Gonzalez',
  password: '1234',
  token: 'asdasdasdasdasdasdasdasd'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  public authUser = this._authUser$.asObservable();

  constructor(
    private router: Router
  ) { }

  login(data: AuthData): Observable<User> {
    if(data.email != FAKE_USER.email || data.password != FAKE_USER.password) {
      return throwError(() => new Error('wrong credentials'));
    }
    this._authUser$.next(FAKE_USER);
    localStorage.setItem('token', FAKE_USER.token)
    return of(FAKE_USER);
  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  verifyToken(): Observable<boolean>{
    const isValid = localStorage.getItem('token') === FAKE_USER.token;
    if(isValid) {
      this._authUser$.next(FAKE_USER);
    } else {
      this._authUser$.next(null);
    }
    return of(isValid);
  }
}
