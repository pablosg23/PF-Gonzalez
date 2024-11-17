import { createFeatureSelector, createSelector } from '@ngrx/store';
import { studentsFeatureKey, State } from './student.reducer';

export const selectStudentsState = createFeatureSelector<State>(studentsFeatureKey);

export const selectStudents = createSelector(
  selectStudentsState,
  (state) => state.students
);

export const selectLoading = createSelector(
  selectStudentsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectStudentsState,
  (state) => state.error
);
