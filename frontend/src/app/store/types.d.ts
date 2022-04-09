import { LoginError, RegisterError, User } from '../models/user.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoading: boolean,
};

export type ImagesState = {
  images: null,
  image: null,
  fetchLoading: boolean,
  fetchError: string | null,
  createLoading: boolean,
  createError: null | string,
  removeLoading: boolean
}

export type AppState = {
  users: UserState,
  images: ImagesState
};


