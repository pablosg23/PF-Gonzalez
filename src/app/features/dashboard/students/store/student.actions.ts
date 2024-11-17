import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../../../../models/Student';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: Student[] }>(),
    'Load Students Failure': props<{ error: string }>(),
    'Add Student': props<{ student: Omit<Student, 'id'> }>(),
    'Add Student Success': props<{ student: Student }>(),
    'Add Student Failure': props<{ error: string }>(),
    'Delete Student': props<{ studentId: string }>(),
    'Delete Student Success': props<{ studentId: string }>(),
    'Delete Student Failure': props<{ error: string }>(),
  },
});
