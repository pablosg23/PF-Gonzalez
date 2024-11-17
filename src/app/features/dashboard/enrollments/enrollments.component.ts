import { Component, OnInit } from '@angular/core';
import { EnrollmentsService } from '../../../core/services/enrollments.service';
import { CoursesService } from '../../../core/services/courses.service';
import { StudentsService } from '../../../core/services/students.service';
import { Course } from '../../../models/Course';
import { Student } from '../../../models/Student';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  courses: Course[] = [];
  students: Student[] = [];
  loading: boolean = false;
  enrollments: { courseId: string; students: string[] }[] = [];

  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.loading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.studentsService.getUsers().subscribe({
          next: (students) => {
            this.students = students;
            this.enrollmentsService.getEnrollments().subscribe({
              next: (enrollments) => {
                this.enrollments = enrollments;
                this.loading = false;
              }
            });
          }
        });
      }
    });
  }

  enrollStudent(courseId: string, studentId: string) {
    this.loading = true;
    this.enrollmentsService.addEnrollment(courseId, studentId).subscribe({
      next: () => this.loadData()
    });
  }

  removeStudent(courseId: string, studentId: string) {
    this.loading = true;
    this.enrollmentsService.removeEnrollment(courseId, studentId).subscribe({
      next: () => this.loadData()
    });
  }

  getStudentsByCourse(courseId: string): Student[] {
    const enrollment = this.enrollments.find(e => e.courseId === courseId);
    if (enrollment) {
      return this.students.filter(student => enrollment.students.includes(student.id));
    }
    return [];
  }

  studentsNotEnrolled(courseId: string): Student[] {
    const enrolledStudentIds = this.getStudentsByCourse(courseId).map(s => s.id);
    return this.students.filter(student => !enrolledStudentIds.includes(student.id));
  }
}
