import { createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { Student } from '../../../../models/Student';

export const studentsFeatureKey = 'students';

export interface State {
  students: Student[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  students: [],
  loading: false,
  error: null,
};

export const studentsReducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    loading: false,
  })),
  on(StudentActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(StudentActions.addStudentSuccess, (state, { student }) => ({
    ...state,
    students: [...state.students, student],
  })),
  on(StudentActions.deleteStudentSuccess, (state, { studentId }) => ({
    ...state,
    students: state.students.filter((student) => student.id !== studentId),
  }))
);
