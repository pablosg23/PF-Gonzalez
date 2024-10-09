import { Component } from '@angular/core';
import {Student} from "../../models/Student";


const ELEMENT_DATA: Student[] = [
  {id: 1, firstName: 'Nametest', lastName: 'Lastnametest', email: '@coderschool.com', createdAt: new Date()},
  {id: 2, firstName: 'Hydrogen', lastName: 'Asd', email: '@coderschool.com', createdAt: new Date()},
  {id: 3, firstName: 'Hydrogen', lastName: 'Asd', email: '@coderschool.com', createdAt: new Date()},
  {id: 4, firstName: 'Hydrogen', lastName: 'Asd', email: '@coderschool.com', createdAt: new Date()},
  {id: 5, firstName: 'Hydrogen', lastName: 'Asd', email: '@coderschool.com', createdAt: new Date()},
  {id: 6, firstName: 'Hydrogen', lastName: 'Asd', email: '@coderschool.com', createdAt: new Date()},
  {id: 7, firstName: 'Hydrogen', lastName: 'Asd', email: '@coderschool.com', createdAt: new Date()},
];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'createdAt', 'actions'];
  dataSource = ELEMENT_DATA;

}
