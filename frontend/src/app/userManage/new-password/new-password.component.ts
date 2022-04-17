import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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
export class NewPasswordComponent {
  loading!: Observable<boolean>;
  @ViewChild('f') form!: NgForm;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.users.loginLoading);
  }

  onSubmit() {
    const password: EditPasswordData = {
      password: this.form.value.password,
      email: 'asyl.kydraliev@gmail.com'
    }

    this.store.dispatch(editPasswordRequest({password: password}));
  }
}
