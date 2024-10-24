import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../../../core/services/courses.service";
import {Course} from "../../../models/Course";
import {MatDialog} from "@angular/material/dialog";
import {CourseDialogComponent} from "./course-dialog/course-dialog.component";

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
    private coursesService: CoursesService,
    private dialog: MatDialog
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

  addCourse(editCourse?: Course){
    this.dialog.open(CourseDialogComponent, {
      data: {
        editCourse: editCourse
      }
    })
      .afterClosed()
      .subscribe({
        next: (student) => {
          if (student) {
            if (editCourse) {
              //this.handleStudentUpdate(editStudent, student)
            } else {
              //this.handleStudentAddition(student);
            }
          }
        }
      });
  }


  deleteCourse(course: Course) {
    this.loadingCourses = true;
    this.coursesService.deleteCourse(course).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loadingCourses = false;
      }
    })
  }

}
