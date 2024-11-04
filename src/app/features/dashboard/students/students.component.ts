import {Component, OnInit} from '@angular/core';
import {Student} from "../../../models/Student";
import {MatDialog} from "@angular/material/dialog";
import {StudentDialogComponent} from "./student-dialog/student-dialog.component";
import {StudentsService} from "../../../core/services/students.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'fullName', 'email', 'createdAt', 'actions'];
  dataSource: Student[] = [];
  loadingStudents: boolean = false;

  constructor(
    private dialog: MatDialog,
    private studentsService: StudentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents() {
    this.loadingStudents = true;
    this.studentsService.getUsers().subscribe({
      next: (students) => {
        this.dataSource = students;
        this.loadingStudents = false;
      }
    })
  }

  goToDetail(student: Student) {
    this.router.navigate([student.id, 'detail'], {relativeTo: this.activatedRoute})
  }

  addStudent(editStudent?: Student) {
    this.dialog.open(StudentDialogComponent, {
      data: {
        editThisStudent: editStudent
      }
    })
      .afterClosed()
      .subscribe({
        next: (student) => {
          if (student) {
            if (editStudent) {
              this.handleStudentUpdate(editStudent, student)
            } else {
              this.handleStudentAddition(student);
            }
          }
        }
      });
  }
  handleStudentDeletion(studentToDelete: Student) {
    this.loadingStudents = true;
    this.studentsService.deleteStudent(studentToDelete).subscribe({
      next: (students: Student[]) => {
        this.dataSource = students;
        this.loadingStudents = false;
      }
    })
  }

  handleStudentUpdate(student: Student, newData: Student) {
    this.loadingStudents = true;
    this.studentsService.updateStudent(student, newData).subscribe({
      next: (students: Student[]) => {
        this.dataSource = students;
        this.loadingStudents = false;
      }
    })
  }

  handleStudentAddition(newStudent: Student) {
    this.loadingStudents = true;
    this.studentsService.addStudent(newStudent).subscribe({
      next: (student: Student) => {
        this.loadStudents();
        this.loadingStudents = false;
      }
    })
  }

}
