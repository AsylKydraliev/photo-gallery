import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { editPasswordRequest } from '../../store/users/users.actions';
import { EditPasswordData } from '../../models/user.model';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.sass']
})
export class NewPasswordComponent implements OnDestroy{
  loading!: Observable<boolean>;
  @ViewChild('f') form!: NgForm;
  userEmail: Observable<string | null>;
  email!: string;
  emailSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.users.loginLoading);
    this.userEmail = store.select(state => state.users.userEmail);
  }

  onSubmit() {
    this.emailSub = this.userEmail.subscribe(email => {
      this.email = <string>email;
    })

    const password: EditPasswordData = {
      password: this.form.value.password,
      email: this.email
    }

    this.store.dispatch(editPasswordRequest({password: password}));
  }

  ngOnDestroy() {
    if(this.emailSub) {
      this.emailSub.unsubscribe();
    }
  }
}
