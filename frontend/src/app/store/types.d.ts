import { LoginError, RegisterError, User } from '../models/user.model';
import { Image } from '../models/image.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoading: boolean,
  code: string | null,
  codeError: string | null,
};

export type ImagesState = {
  images: Image[],
  image: Image | null,
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


