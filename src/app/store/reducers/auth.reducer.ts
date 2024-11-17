import {User} from "../../models/User";
import {createReducer, on} from "@ngrx/store";
import {AuthActions} from "../actions/auth.actions";

export const authFeatureName = 'auth';

export interface AuthState {
  authenticatedUser: User | null;
}

const initialState: AuthState = {
  authenticatedUser: null
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuthenticatedUser, (state, actions) => {
    return {
      ...state,
      authenticatedUser: actions.user
    }
  }),
  on(AuthActions.unsetAuthenticatedUser, (state) => {
    return {
      ...state,
      authenticatedUser: null
    }
  })
  )
