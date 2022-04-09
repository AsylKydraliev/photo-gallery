import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/image.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { fetchImagesRequest, fetchImagesUserRequest } from '../store/images/images.actions';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.component.html',
  styleUrls: ['./my-images.component.sass']
})
export class MyImagesComponent implements OnInit {
  images: Observable<Image[]>;
  loading: Observable<boolean>;
  api = environment.apiUrl;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.images = store.select(state => state.images.images);
    this.loading = store.select(state => state.images.fetchLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(fetchImagesUserRequest({userId: params['id']}));
    })
  }

  onRemove(_id: string) {

  }
}
