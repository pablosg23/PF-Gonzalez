import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../../../core/services/courses.service";
import {Course} from "../../../models/Course";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  loadingCourses: boolean = false;
  courses: Course[] = [];
  longText = '';

  constructor(
    private coursesService: CoursesService
  ) {
  }

  ngOnInit() {
    this.loadingCourses = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loadingCourses = false;
      }
    })
  }

  addCourse(){

  }

}
