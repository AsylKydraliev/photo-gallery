import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { Image } from '../models/image.model';
import { fetchImagesRequest } from '../store/images/images.actions';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit {
  images: Observable<Image[]>;
  loading: Observable<boolean>;
  api = environment.apiUrl;

  constructor(private store: Store<AppState>) {
    this.images = store.select(state => state.images.images);
    this.loading = store.select(state => state.images.fetchLoading);
  }

  ngOnInit() {
    this.store.dispatch(fetchImagesRequest());
  }

  onRemove(_id: string) {

  }
}
