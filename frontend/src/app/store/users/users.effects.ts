import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  loginFbFailure,
  loginFbRequest,
  loginFbSuccess,
  loginUsersFailure,
  loginUsersRequest,
  loginUsersSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { map, mergeMap, tap } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';
import { HelpersService } from '../../services/helpers.service';

@Injectable()
export class UsersEffects {
  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({users}) => this.usersService.registerUser(users).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Register successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(registerUserFailure)
    ))
  ))

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUsersRequest),
    mergeMap(({userData}) => this.usersService.loginUser(userData).pipe(
      map(user => loginUsersSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUsersFailure)
    ))
  ))

  loginFb = createEffect(() => this.actions.pipe(
    ofType(loginFbRequest),
    mergeMap(({userData}) => this.usersService.loginFb(userData).pipe(
      map(user => loginFbSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Sign up with facebook successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginFbFailure)
    ))
  ))

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => this.usersService.logoutUser().pipe(
      map(() => {
        void this.auth.signOut();
        return logoutUser();
      }),
      tap(async () => {
        this.helpers.openSnackbar('Logout successful');
        await this.router.navigate(['/']);
      })
    ))
  ))

  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private helpers: HelpersService,
    private auth: SocialAuthService
  ) {}
}
