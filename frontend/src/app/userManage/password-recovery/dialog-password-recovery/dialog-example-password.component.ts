import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example-recovery.component.html',
  styleUrls: ['./dialog-example-password.component.sass']
})
export class DialogExamplePasswordComponent {
  @ViewChild('f') form!: NgForm;

  constructor(private usersService: UsersService) {

  }

  onSubmit() {
    const code = this.form.value;
    this.usersService.sendCode(code).subscribe();
  }
}
