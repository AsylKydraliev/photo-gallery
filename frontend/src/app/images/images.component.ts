import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable, Subscription } from 'rxjs';
import { Image } from '../models/image.model';
import { fetchImageInfoRequest, fetchImagesRequest } from '../store/images/images.actions';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit, OnDestroy {
  images: Observable<Image[]>;
  loading: Observable<boolean>;
  api = environment.apiUrl;
  user: Observable<User | null>;
  imagesData!: Image[];
  image!: Image;
  imageSub!: Subscription;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.images = store.select(state => state.images.images);
    this.loading = store.select(state => state.images.fetchLoading);
    this.user = store.select(state => state.users.user);

    this.imageSub = this.images.subscribe(image => {
      this.imagesData = image;
    })
  }

  ngOnInit() {
    this.store.dispatch(fetchImagesRequest());
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
  }
}

