import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, switchMap, throwError} from "rxjs";
import {AuthData} from "../../models/AuthData";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  public authUser = this._authUser$.asObservable();
  private baseURL = environment.apiBaseURL;
  private apiAuthUsers: string = this.baseURL + '/users';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(data: AuthData): Observable<User> {
    return this.http.get<User[]>(
      this.apiAuthUsers,
      {
        params: {
          email: data.email,
          password: data.password
        }
      }
    ).pipe(
      switchMap(users => {
        const user = this.handleAuth(users);
        if (user) {
          return of(user); // Return user as an Observable<User>
        } else {
          return throwError(() => new Error('wrong credentials'));
        }
      }),
      catchError(err => throwError(() => err)) // Ensure type consistency in case of errors
    );
  }


  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  verifyToken(): Observable<boolean>{
    const token = localStorage.getItem('token');
    return this.http.get<User[]>(
      this.apiAuthUsers,
      {
        params: {
          token: token || 'null'
        }
      }
    ).pipe(map(users => {
      const user = this.handleAuth(users);
      return !!users
    }))
  }

  private handleAuth(users: User[]): User | null {
    if(!!users[0]){
      this._authUser$.next(users[0]);
      localStorage.setItem('token', users[0].token)
      return users[0];
    } else {
      return null
    }
  }
}
