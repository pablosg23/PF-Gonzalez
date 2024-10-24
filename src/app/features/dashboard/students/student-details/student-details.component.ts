import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentsService} from "../../../../core/services/students.service";
import {Student} from "../../../../models/Student";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent implements OnInit {
  idStudent?: string;
  student?: Student;
  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ) {
    this.idStudent = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.studentsService.getById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (student) => {
        this.student = student
      }
    })
  }
}
