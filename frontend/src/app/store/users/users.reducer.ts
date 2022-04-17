import { UserState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  editPasswordFailure,
  editPasswordRequest, editPasswordSuccess,
  loginFbFailure,
  loginFbRequest,
  loginFbSuccess,
  loginUsersFailure,
  loginUsersRequest,
  loginUsersSuccess,
  logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess, sendEmailRequest, sendEmailSuccess, sendUserCodeFailure, sendUserCodeRequest, sendUserCodeSuccess
} from './users.actions';

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  fbLoading: false,
  code: null,
  codeError: null
}

export const usersReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({...state, registerLoading: true, registerError: null})),
  on(registerUserSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(registerUserFailure, (state, {error}) => ({...state, registerLoading: false, registerError: error})),

  on(loginUsersRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(loginUsersSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginUsersFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),

  on(loginFbRequest, state => ({...state, fbLoading: true, loginError: null})),
  on(loginFbSuccess, (state, {user}) => ({...state, fbLoading: false, user})),
  on(loginFbFailure, (state, {error}) => ({...state, fbLoading: false, loginError: error})),

  on(logoutUser, state => ({...state, user: null})),

  on(sendEmailRequest, state => ({...state, loginLoading: true})),
  on(sendEmailSuccess, state => ({...state, loginLoading: false})),

  on(sendUserCodeRequest, state => ({...state, loginLoading: true})),
  on(sendUserCodeSuccess, (state, {code}) => ({...state, loginLoading: false, code: code})),
  on(sendUserCodeFailure, (state, {error}) => ({...state, loginLoading: false, codeError: error})),

  on(editPasswordRequest, state => ({...state, loginLoading: true})),
  on(editPasswordSuccess, state => ({...state, loginLoading: false})),
  on(editPasswordFailure, state => ({...state, loginLoading: false}))
)
