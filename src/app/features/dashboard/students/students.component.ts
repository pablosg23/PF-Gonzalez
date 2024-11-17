import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StudentActions } from './store/student.actions';
import { selectStudents, selectLoading } from './store/student.selectors';
import { Student } from '../../../models/Student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students$: Observable<Student[]> = this.store.select(selectStudents);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudents());
  }

  addStudent(student: Omit<Student, 'id'>) {
    this.store.dispatch(StudentActions.addStudent({ student }));
  }

  deleteStudent(studentId: string) {
    this.store.dispatch(StudentActions.deleteStudent({ studentId }));
  }
}
