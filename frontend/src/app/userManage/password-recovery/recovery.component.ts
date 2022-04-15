import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginError } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { UsersService } from '../../services/users.service';
import { fetchImageInfoRequest } from '../../store/images/images.actions';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';
import { DialogExamplePasswordComponent } from './dialog-password-recovery/dialog-example-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.sass']
})

export class RecoveryComponent {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | LoginError>;
  loading = false;

  constructor(private store: Store<AppState>, private usersService: UsersService, public dialog: MatDialog) {
    this.error = store.select(state => state.users.loginError);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogExamplePasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit() {
    this.loading = true;
    const userEmail = this.form.value;
    this.usersService.recoveryPassword(userEmail).subscribe(() => {
      this.loading = false;
    });
  }
}
