import {authFeatureName, AuthState} from "../reducers/auth.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureName);

export const selectAuthenticatedUser = createSelector(
  selectAuthState,
  (state) => state.authenticatedUser
);

