import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fbLoginUserData, LoginUserData, RegisterUser, User } from '../models/user.model';
import { environment } from '../../environments/environment';

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
}
