import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable, Subscription } from 'rxjs';
import { Image } from '../models/image.model';
import { fetchImagesRequest } from '../store/images/images.actions';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../ui/modal/modal.component';

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
  modelComponent!: ModalComponent;
  openModal = false;
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

  // isOpen(id: string) {
  //   this.imagesData.forEach(image => {
  //     if(id === image._id){
  //       this.image = image;
  //     }
  //   })
  //   this.openModal = true;
  // }
  //
  // isClose() {
  //   this.openModal = false;
  // }

  openDialog(id: string) {
    this.imagesData.forEach(image => {
      if(id === image._id){
        this.image = image;
      }
    })
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy() {
    this.imageSub.unsubscribe();
  }
}

export class DialogContentExampleDialog {}
