import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';
import {Enrollment} from "../../models/Enrollment";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  private baseUrl = environment.apiBaseURL;
  private apiEnrollments = `${this.baseUrl}/enrollments`;

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiEnrollments);
  }

  addEnrollment(courseId: string, studentId: string): Observable<void> {
    return this.getEnrollments().pipe(
      switchMap(enrollments => {
        const existingEnrollment = enrollments.find(e => e.courseId === courseId);
        if (existingEnrollment) {
          if (!existingEnrollment.students.includes(studentId)) {
            existingEnrollment.students.push(studentId);
            return this.http.put<void>(`${this.apiEnrollments}/${existingEnrollment.id}`, existingEnrollment);
          }
          return of();
        } else {
          return this.http.post<void>(this.apiEnrollments, { courseId, students: [studentId] });
        }
      })
    );
  }

  removeEnrollment(courseId: string, studentId: string): Observable<void> {
    return this.getEnrollments().pipe(
      switchMap(enrollments => {
        const existingEnrollment = enrollments.find(e => e.courseId === courseId);
        if (existingEnrollment) {
          existingEnrollment.students = existingEnrollment.students.filter(s => s !== studentId);
          if (existingEnrollment.students.length === 0) {
            return this.http.delete<void>(`${this.apiEnrollments}/${existingEnrollment.id}`);
          } else {
            return this.http.put<void>(`${this.apiEnrollments}/${existingEnrollment.id}`, existingEnrollment);
          }
        }
        return of();
      })
    );
  }
}
