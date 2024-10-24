import { Injectable } from '@angular/core';
import {Course} from "../../models/Course";
import {delay, Observable, of} from "rxjs";

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolor ducimus et explicabo facere ipsam laudantium magni perspiciatis, soluta. Alias aliquam atque earum harum in iure quas repellat temporibus voluptas.';

let COURSES_DB: Course[] = [
  { id: 'abc', name: 'Course 1', details: lorem, tags: ['tag1', 'tag2', 'tag3']},
  { id: 'asd', name: 'Course 2', details: lorem, tags: ['tag1', 'tag2', 'tag3']},
  { id: 'qwe', name: 'Course 3', details: lorem, tags: ['tag1', 'tag2', 'tag3']},
  { id: 'xcv', name: 'Course 4', details: lorem, tags: ['tag1', 'tag2', 'tag3']},
  { id: 'qwe', name: 'Course 5', details: lorem, tags: ['tag1', 'tag2', 'tag3']},
  { id: 'abw', name: 'Course 6', details: lorem, tags: ['tag1', 'tag2', 'tag3']},
  { id: 'aas', name: 'Course 7', details: lorem, tags: ['tag1', 'tag2', 'tag3']}
];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor() { }

  getCourses(): Observable<Course[]> {
    return of(COURSES_DB).pipe(delay(500));
  }
}
