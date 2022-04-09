export interface User {
  _id: string,
  email: string,
  displayName: string,
  token: string,
  role: string,
}

export interface RegisterUser {
  email: string,
  displayName: string,
  password: string,
}

export interface LoginUserData {
  email: string,
  password: string
}

export interface fbLoginUserData {
  authToken: string,
  id: string,
  email: string,
  name: string,
}

export interface FieldError {
  message: string
}

export interface  RegisterError {
  errors: {
    password: FieldError,
    email: FieldError,
    displayName: FieldError
  }
}

export interface LoginError {
  error: string
}
