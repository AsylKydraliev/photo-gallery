import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CodeUserData,
  EditPasswordData,
  fbLoginUserData,
  LoginUserData,
  RegisterUser,
  User
} from '../models/user.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  registerUser(userData: RegisterUser){
    return this.http.post<User>(environment.apiUrl + '/users', userData);
  }

  loginUser(userData: LoginUserData){
    return this.http.post<User>(environment.apiUrl + '/users/sessions', userData);
  }

  loginFb(userData: fbLoginUserData){
    return this.http.post<User>(environment.apiUrl + '/users/facebookLogin', userData);
  }

  logoutUser(){
    return this.http.delete(environment.apiUrl + '/users/sessions');
  }

  recoveryPassword(email: {}) {
    return this.http.post<User>(environment.apiUrl + `/users/recovery`, email);
  }

  sendCode(userData: CodeUserData) {
    return this.http.post<string>(environment.apiUrl + `/users/checkCode`, userData).pipe(
      map(response => {
        return response;
      })
    );
  }

  editPassword(password: EditPasswordData) {
    console.log(password)
    return this.http.put(environment.apiUrl + `/users/editPassword`, password);
  }
}
