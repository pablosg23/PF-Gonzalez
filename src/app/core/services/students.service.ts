import { Injectable } from '@angular/core';
import {delay, Observable, of} from "rxjs";
import {Student} from "../../models/Student";

const ELEMENT_DATA: Student[] = [ //Temporary DB call
  {id: "zewuhr10a9i-m2md6kf1", firstName: 'Nametest', lastName: 'Lastnametest', email: 'a@coderschool.com', createdAt: new Date()},
  {id: "zewuhr10a9i-m2md1kf2", firstName: 'Juan', lastName: 'Asd', email: 'a@coderschool.com', createdAt: new Date()},
  {id: "zewuhr10a9i-m2m61kf3", firstName: 'Pedro', lastName: 'Asd', email: 'b@coderschool.com', createdAt: new Date()},
  {id: "zewuhr10a9i-m2d61kf4", firstName: 'Pablo', lastName: 'Asd', email: 'c@coderschool.com', createdAt: new Date()},
  {id: "zewuhr10a9i-mmd61kf5", firstName: 'Julio', lastName: 'Asd', email: 'd@coderschool.com', createdAt: new Date()},
  {id: "zewuhr10a9i-2md61kf6", firstName: 'Marcos', lastName: 'Asd', email: 'f@coderschool.com', createdAt: new Date()},
  {id: "zewuhr10a9i-m2md61k7", firstName: 'Lila', lastName: 'Asd', email: 'g@coderschool.com', createdAt: new Date()},
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getUsers(): Observable<Student[]> {
    return of(ELEMENT_DATA).pipe(delay(2000))
  }
}
