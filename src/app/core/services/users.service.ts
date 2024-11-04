import { Injectable } from '@angular/core';
import { concatMap, Observable } from "rxjs";
import { User } from "../../models/User";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.apiBaseURL;
  private apiUsers = this.baseUrl + '/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUsers);
  }

  updateUser(user: User, newData: User): Observable<User[]> {
    return this.http.patch(this.apiUsers + '/' + user.id, newData).pipe(
      concatMap(() => this.getUsers())
    );
  }

  addUser(newUser: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUsers, {
      ...newUser,
      createdAt: new Date().toISOString(),
    });
  }

  deleteUser(userToDelete: User): Observable<User[]> {
    return this.http.delete(this.apiUsers + '/' + userToDelete.id).pipe(
      concatMap(() => this.getUsers())
    );
  }

  getById(id: string): Observable<User | undefined> {
    return this.http.get<User>(this.apiUsers + `/${id}`);
  }
}
