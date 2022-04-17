import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { sendUserCodeRequest } from '../../../store/users/users.actions';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../../store/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example-password.component.html',
  styleUrls: ['./dialog-example-password.component.sass']
})
export class DialogExamplePasswordComponent implements OnDestroy{
  @ViewChild('f') form!: NgForm;
  codeObservable: Observable<string | null>;
  email: Observable<string | null>;
  emailSub!: Subscription;
  codeSub!: Subscription;
  code!: string | null;
  userEmail!: string;

  constructor(private store: Store<AppState>, private router: Router) {
    this.codeObservable = store.select(state => state.users.code);
    this.email = store.select(state => state.users.userEmail);
  }

  onSubmit() {
    this.codeSub = this.codeObservable.subscribe(code => {
      if(code) {
        void this.router.navigate(['/newPassword'])
      }
    });

    this.emailSub = this.email.subscribe(email => {
      this.userEmail = <string>email;
    })

    const userCheckCodeData = {
      email: this.userEmail,
      code: this.form.value.code
    };

    this.store.dispatch(sendUserCodeRequest({userData: userCheckCodeData}));
  }

  ngOnDestroy() {
    this.emailSub.unsubscribe();
    this.codeSub.unsubscribe();
  }
}
