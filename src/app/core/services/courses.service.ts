import {Injectable} from '@angular/core';
import {Course} from "../../models/Course";
import {concatMap, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = environment.apiBaseURL;
  private apiCourses = this.baseUrl + '/courses'
  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(
      this.apiCourses
    );
  }

  updateCourse(course: Course, newCourse: Course): Observable<Course[]> {
    return this.http.patch<Course>(
      `${this.apiCourses}/${course.id}`,
      newCourse
    ).pipe(
      concatMap(() => this.getCourses()) // Fetch updated list after patch
    );
  }

  addCourse(newCourse: Omit<Course, 'id'>): Observable<Course[]> {
    return this.http.post<Course>(
      this.apiCourses,
      {
        ...newCourse
      }
    ).pipe(
      concatMap(() => this.getCourses()) // Fetch updated list after adding
    );
  }

  deleteCourse(courseToDelete: Course): Observable<Course[]> {
    return this.http.delete(
      `${this.apiCourses}/${courseToDelete.id}`
    ).pipe(
      concatMap(() => this.getCourses()) // Fetch updated list after deletion
    );
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiCourses}/${id}`);
  }
}
