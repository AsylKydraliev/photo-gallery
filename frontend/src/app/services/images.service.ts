import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image, ImageData, ImageModel } from '../models/image.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Image[]>(environment.apiUrl + '/images').pipe(
      map(response => {
        return response.map(images => {
          return new ImageModel(
            images._id,
            images.user,
            images.name,
            images.image,
          )
        });
      }),
    )
  };

  getImagesByUser(id: string) {
    return this.http.get<Image[]>(environment.apiUrl + `/images?user=${id}`).pipe(
      map(response => {
        return response.map(image => {
          return new ImageModel(
            image._id,
            image.user,
            image.name,
            image.image,
          )
        });
      }),
    )
  };

  createPhoto(imageData: ImageData) {
    const formData = new FormData();
    formData.append('user', imageData.user);
    formData.append('name', imageData.name);

    if (imageData.image) {
      formData.append('image', imageData.image);
    }

    return this.http.post(environment.apiUrl + '/images', formData);
  }
}
