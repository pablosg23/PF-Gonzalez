import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';
import { StudentsService } from '../../../../core/services/students.service';
import { Student } from '../../../../models/Student';

interface CourseDetailsDialogData {
  courseId: string;
  courseName: string;
}

@Component({
  selector: 'app-course-detail-dialog',
  templateUrl: './course-details-dialog.component.html',
  styleUrls: ['./course-details-dialog.component.scss']
})
export class CourseDetailsDialogComponent implements OnInit {
  students: Student[] = [];
  enrolledStudents: Student[] = [];
  availableStudents: Student[] = [];
  selectedStudentId?: string;
  loading = false;

  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private matDialogRef: MatDialogRef<CourseDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseDetailsDialogData
  ) {
  }

  ngOnInit() {
    this.loadStudents();
  }

  private loadStudents() {
    this.loading = true;
    this.studentsService.getUsers().subscribe({
      next: (students) => {
        this.students = students;
        this.loadEnrollments();
      },
    });
  }

  private loadEnrollments() {
    this.enrollmentsService.getEnrollments().subscribe({
      next: (enrollments) => {
        const enrollment = enrollments.find((e) => e.courseId === this.data.courseId);
        if (enrollment) {
          this.enrolledStudents = this.students.filter((student) =>
            enrollment.students.includes(student.id)
          );
        } else {
          this.enrolledStudents = [];
        }
        this.filterAvailableStudents();
        this.loading = false;
      },
    });
  }

  private filterAvailableStudents() {
    this.availableStudents = this.students.filter(
      (student) => !this.enrolledStudents.some((enrolled) => enrolled.id === student.id)
    );
  }

  addStudentToCourse() {
    if (this.selectedStudentId) {
      this.enrollmentsService
        .addEnrollment(this.data.courseId, this.selectedStudentId)
        .subscribe({
          next: () => {
            this.loadEnrollments();
            alert('Student added successfully!');
          },
          error: () => alert('Failed to add student'),
        });
    }
  }

  removeStudentFromCourse(studentId: string) {
    this.enrollmentsService.removeEnrollment(this.data.courseId, studentId).subscribe({
      next: () => {
        this.loadEnrollments();
        alert('Student removed successfully!');
      },
      error: () => alert('Failed to remove student'),
    });
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
