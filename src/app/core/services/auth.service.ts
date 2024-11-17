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
    if (!token) {
      return of(false);
    }

    return this.http.get<User[]>(this.apiAuthUsers, {
      params: { token }
    }).pipe(
      map(users => {
        if (users.length > 0) {
          const user = this.handleAuth(users);
          return !!user;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  private handleAuth(users: User[]): User | null {
    const token = localStorage.getItem('token');
    const user = users.find(u => u.token === token);
    if (user) {
      this._authUser$.next(user);
      localStorage.setItem('token', user.token);
      return user;
    }
    return null;
  }


  isAdmin(): Observable<boolean> {
    return this.authUser.pipe(map(user => user?.role === 'ADMIN'));
  }
}
