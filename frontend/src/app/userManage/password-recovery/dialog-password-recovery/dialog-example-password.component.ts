import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { sendUserCodeRequest } from '../../../store/users/users.actions';
import { CodeUserData } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example-password.component.html',
  styleUrls: ['./dialog-example-password.component.sass']
})
export class DialogExamplePasswordComponent {
  @ViewChild('f') form!: NgForm;
  codeObservable: Observable<string | null>;
  code!: string | null;

  constructor(private store: Store<AppState>, private router: Router) {
    this.codeObservable = store.select(state => state.users.code);
  }

  onSubmit() {
    this.codeObservable.subscribe(code => {
      if(code) {
        void this.router.navigate(['/newPassword'])
      }
    });

    const userCheckCodeData = {
      email: 'asyl.kydraliev@gmail.com', // ГДЕ ВЗЯТЬ USER - EMAIL??????
      code: this.form.value.code
    };

    this.store.dispatch(sendUserCodeRequest({userData: userCheckCodeData}));
  }
}
