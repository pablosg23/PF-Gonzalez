import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../core/services/students.service';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { Student } from '../../../../models/Student';
import { Course } from '../../../../models/Course';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  idStudent?: string;
  student?: Student;
  courses: Course[] = [];
  enrolledCourses: Course[] = [];
  availableCourses: Course[] = [];
  selectedCourseId?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService
  ) {
    this.idStudent = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadStudent();
    this.loadCourses();
  }

  private loadStudent() {
    this.studentsService.getById(this.idStudent!).subscribe({
      next: (student) => {
        this.student = student;
        this.loadEnrolledCourses();
      }
    });
  }

  private loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.filterAvailableCourses();
      }
    });
  }

  private loadEnrolledCourses() {
    if (!this.student) return;

    this.enrollmentsService.getEnrollments().subscribe({
      next: (enrollments) => {
        const studentEnrollments = enrollments.filter(e => e.students.includes(this.student!.id));
        this.enrolledCourses = this.courses.filter(course =>
          studentEnrollments.some(e => e.courseId === course.id)
        );
        this.filterAvailableCourses();
      }
    });
  }

  private filterAvailableCourses() {
    this.availableCourses = this.courses.filter(
      course => !this.enrolledCourses.find(enrolled => enrolled.id === course.id)
    );
  }

  enrollStudent() {
    if (this.student && this.selectedCourseId) {
      this.enrollmentsService.addEnrollment(this.selectedCourseId, this.student.id).subscribe({
        next: () => {
          this.loadEnrolledCourses();
          alert(`${this.student?.firstName} enrolled in course successfully`);
        },
        error: () => alert(`Failed to enroll ${this.student?.firstName} in course`)
      });
    }
  }

  removeEnrollment(courseId: string) {
    if (this.student) {
      this.enrollmentsService.removeEnrollment(courseId, this.student.id).subscribe({
        next: () => {
          this.loadEnrolledCourses();
          alert(`${this.student?.firstName} removed from course successfully`);
        },
        error: () => alert(`Failed to remove ${this.student?.firstName} from course`)
      });
    }
  }
}
