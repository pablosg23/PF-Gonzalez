import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, switchMap, throwError} from "rxjs";
import {AuthData} from "../../models/AuthData";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {AuthActions} from "../../store/actions/auth.actions";
import {selectAuthenticatedUser} from "../../store/selectors/auth.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authUser = this.store.select(selectAuthenticatedUser);
  private baseURL = environment.apiBaseURL;
  private apiAuthUsers: string = this.baseURL + '/users';

  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store
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
          return of(user);
        } else {
          return throwError(() => new Error('wrong credentials'));
        }
      }),
      catchError(err => throwError(() => err))
    );
  }


  logout() {
    this.store.dispatch(AuthActions.unsetAuthenticatedUser())
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
    if(!!users[0]){
      this.store.dispatch(AuthActions.setAuthenticatedUser({ user: users[0] }))
      localStorage.setItem('token', users[0].token)
      return users[0];
    } else {
      return null
    }
  }
}
