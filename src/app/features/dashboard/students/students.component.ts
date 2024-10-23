import {Component, OnInit} from '@angular/core';
import {Student} from "../../../models/Student";
import {MatDialog} from "@angular/material/dialog";
import {StudentDialogComponent} from "./student-dialog/student-dialog.component";
import {StudentsService} from "../../../core/services/students.service";

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
    private studentsService: StudentsService
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
              this.dataSource = this.dataSource.map((currentData) => currentData.id === editStudent.id ? {...currentData, ...student} : currentData)
            } else {
                this.dataSource = [
                  ...this.dataSource,
                  {
                    ...student
                  }
                ]
              }
          }
        }
      });
  }
  deleteStudent(studentToDelete: Student) {
    this.dataSource = this.dataSource.filter((student) => student !== studentToDelete)
  }

}
