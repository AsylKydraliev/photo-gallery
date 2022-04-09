import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Image } from '../models/image.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { fetchImageInfoRequest, fetchImagesUserRequest, removeImageRequest } from '../store/images/images.actions';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.component.html',
  styleUrls: ['./my-images.component.sass']
})
export class MyImagesComponent implements OnInit, OnDestroy {
  images: Observable<Image[]>;
  loading: Observable<boolean>;
  api = environment.apiUrl;
  imageSub: Subscription;
  userSub!: Subscription;
  imageUser!: string;
  imageUsername!: string;
  user: Observable<User | null>;
  userId!: string | undefined;

  constructor(private store: Store<AppState>, private route: ActivatedRoute,  public dialog: MatDialog) {
    this.images = store.select(state => state.images.images);
    this.loading = store.select(state => state.images.fetchLoading);
    this.user = store.select(state => state.users.user);

    this.userSub = this.user.subscribe(user => {
      this.userId = user?._id;
    })

    this.imageSub = this.images.subscribe(image => {
      image.forEach(item => {
        this.imageUser = item.user._id;
        this.imageUsername = item.user.displayName;
      })
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(fetchImagesUserRequest({userId: params['id']}));
    })
  }

  onRemove(_id: string) {
    this.store.dispatch(removeImageRequest({id: _id}));
  }

  openDialog(id: string) {
    this.store.dispatch(fetchImageInfoRequest({id}));

    const dialogRef = this.dialog.open(DialogExampleComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy() {
    this.imageSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
