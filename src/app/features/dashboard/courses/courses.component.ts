import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../../../core/services/courses.service";
import {Course} from "../../../models/Course";
import {MatDialog} from "@angular/material/dialog";
import {CourseDialogComponent} from "./course-dialog/course-dialog.component";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  loadingCourses: boolean = false;
  courses: Course[] = [];

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loadCourses();
  }

  private loadCourses() {
    this.loadingCourses = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loadingCourses = false;
      },
      error: () => this.loadingCourses = false // Ensure to handle errors as well
    });
  }

  addCourse(editCourse?: Course) {
    this.dialog.open(CourseDialogComponent, {
      data: { editCourse }
    })
      .afterClosed()
      .subscribe({
        next: (course) => {
          if (course) {
            if (editCourse) {
              this.handleCourseUpdate(editCourse, course);
            } else {
              this.handleCourseAddition(course);
            }
          }
        }
      });
  }

  handleCourseUpdate(course: Course, updatedCourse: Course) {
    this.loadingCourses = true;
    this.coursesService.updateCourse(course, updatedCourse).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loadingCourses = false;
      },
      error: () => this.loadingCourses = false // Handle errors properly
    });
  }

  handleCourseAddition(newCourse: Course) {
    this.loadingCourses = true;
    this.coursesService.addCourse(newCourse).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loadingCourses = false;
      },
      error: () => this.loadingCourses = false // Handle errors
    });
  }

  deleteCourse(course: Course) {
    this.loadingCourses = true;
    this.coursesService.deleteCourse(course).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loadingCourses = false;
      },
      error: () => this.loadingCourses = false // Handle errors
    });
  }
}
