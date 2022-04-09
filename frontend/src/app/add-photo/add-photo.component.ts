import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { createImageRequest } from '../store/images/images.actions';
import { User } from '../models/user.model';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.sass']
})
export class AddPhotoComponent implements OnDestroy{
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  user: Observable<User | null>;
  error: Observable<null | string>;
  userId!: string | undefined;
  userSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.images.createLoading);
    this.error = store.select(state => state.images.createError);
    this.user = store.select(state => state.users.user);
    this.userSub = this.user.subscribe(user => {
      this.userId = <string>user?._id;
    })
  }

  onSubmit() {
    const image = {
      user: <string>this.userId,
      name: this.form.value.name,
      image: this.form.value.image,
    }

    this.store.dispatch(createImageRequest({imageData: image}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
