import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Class } from "../../models/Class";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private baseUrl = environment.apiBaseURL;
  private apiClasses = `${this.baseUrl}/classes`;

  constructor(private http: HttpClient) {}

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiClasses);
  }

  getClassById(id: string): Observable<Class | undefined> {
    return this.http.get<Class>(`${this.apiClasses}/${id}`);
  }

  addClass(newClass: Omit<Class, 'id'>): Observable<Class> {
    return this.http.post<Class>(this.apiClasses, {
      ...newClass,
      createdAt: new Date().toISOString()
    });
  }

  updateClass(classId: string, updatedClass: Partial<Class>): Observable<Class> {
    return this.http.patch<Class>(`${this.apiClasses}/${classId}`, updatedClass);
  }

  deleteClass(classId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiClasses}/${classId}`);
  }
}
