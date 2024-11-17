import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentActions } from './student.actions';
import { StudentsService } from '../../../../core/services/students.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import {Student} from "../../../../models/Student";

@Injectable()
export class StudentEffects {
  constructor(private actions$: Actions, private studentsService: StudentsService) {}

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      mergeMap(() =>
        this.studentsService.getUsers().pipe(
          map((students) => StudentActions.loadStudentsSuccess({ students })),
          catchError((error) => of(StudentActions.loadStudentsFailure({ error: error.message })))
        )
      )
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.addStudent),
      mergeMap(({ student }) =>
        this.studentsService.addStudent(student).pipe(
          map((newStudent) => StudentActions.addStudentSuccess({ student: newStudent })),
          catchError((error) => of(StudentActions.addStudentFailure({ error: error.message })))
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      mergeMap(({ studentId }) =>
        this.studentsService.deleteStudent({ id: studentId } as Student).pipe(
          map(() => StudentActions.deleteStudentSuccess({ studentId })),
          catchError((error) => of(StudentActions.deleteStudentFailure({ error: error.message })))
        )
      )
    )
  );
}
