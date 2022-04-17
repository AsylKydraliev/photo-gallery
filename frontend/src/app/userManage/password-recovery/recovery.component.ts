import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { DialogExamplePasswordComponent } from './dialog-password-recovery/dialog-example-password.component';
import { MatDialog } from '@angular/material/dialog';
import { sendEmailRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.sass']
})

export class RecoveryComponent {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.codeError);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogExamplePasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit() {
    const email = this.form.value;
    this.store.dispatch(sendEmailRequest(email));
  }
}
