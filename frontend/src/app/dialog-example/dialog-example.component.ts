import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable, Subscription } from 'rxjs';
import { Image } from '../models/image.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.sass']
})
export class DialogExampleComponent implements OnDestroy{
  image: Observable<Image | null>;
  api = environment.apiUrl;
  imageData!: Image | null;
  imageSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.image = store.select(state => state.images.image);
    this.image.subscribe(image => {
      this.imageData = image;
    })
  }

  ngOnDestroy() {
    if(this.imageSub){
      this.imageSub.unsubscribe();
    }
  }
}
