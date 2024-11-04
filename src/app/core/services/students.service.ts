import { Injectable } from '@angular/core';
import {concatMap, delay, map, Observable, of} from "rxjs";
import {Student} from "../../models/Student";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private baseUrl = environment.apiBaseURL;
  private apiStudents = this.baseUrl + '/students';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<Student[]> {
    return this.http.get<Student[]>(
      this.apiStudents
    );
  }

  updateStudent(student: Student, newData: Student): Observable<Student[]> {
    return this.http.patch(
      this.apiStudents + '/' + student.id,
      newData
    ).pipe(
      concatMap(() => this.getUsers())
    );
  }

  addStudent(newStudent: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(
      this.apiStudents,
      {
        ...newStudent,
        createdAt: new Date().toISOString()
      }
    )
  }

  deleteStudent(studentToDelete: Student):  Observable<Student[]> {
    return this.http.delete(
      this.apiStudents + '/' + studentToDelete.id
    ).pipe(
      concatMap(() => this.getUsers())
    );
  }

  getById(id: string): Observable<Student | undefined> {
    return this.getUsers().pipe(map((student) => student.find((s)=> s.id === id)))
  }
}
