import {Component} from '@angular/core';
import {Student} from "../../models/Student";
import {MatDialog} from "@angular/material/dialog";
import {StudentDialogComponent} from "./student-dialog/student-dialog.component";


const ELEMENT_DATA: Student[] = [
  {id: 1, firstName: 'Nametest', lastName: 'Lastnametest', email: 'a@coderschool.com', createdAt: new Date()},
  {id: 2, firstName: 'Juan', lastName: 'Asd', email: 'a@coderschool.com', createdAt: new Date()},
  {id: 3, firstName: 'Pedro', lastName: 'Asd', email: 'b@coderschool.com', createdAt: new Date()},
  {id: 4, firstName: 'Pablo', lastName: 'Asd', email: 'c@coderschool.com', createdAt: new Date()},
  {id: 5, firstName: 'Julio', lastName: 'Asd', email: 'd@coderschool.com', createdAt: new Date()},
  {id: 6, firstName: 'Marcos', lastName: 'Asd', email: 'f@coderschool.com', createdAt: new Date()},
  {id: 7, firstName: 'Lila', lastName: 'Asd', email: 'g@coderschool.com', createdAt: new Date()},
];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'createdAt', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog) {
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
          if (!!student) {
            if (editStudent) {
              this.dataSource = this.dataSource.map((currentData) => currentData.id === editStudent.id ? {...currentData, ...student} : editStudent)
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
