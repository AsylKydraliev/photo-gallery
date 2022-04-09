import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { User } from '../../models/user.model';
import {
  createImageFailure,
  createImageRequest, createImageSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess, fetchImagesUserFailure,
  fetchImagesUserRequest,
  fetchImagesUserSuccess, removeImageRequest, removeImageSuccess
} from './images.actions';
import { ImagesService } from '../../services/images.service';

@Injectable()

export class ImagesEffects {
  user: Observable<User | null>;
  userRole!: string | undefined;
  userId!: string;

  fetchImages = createEffect(() => this.actions.pipe(
    ofType(fetchImagesRequest),
    mergeMap(() => this.imageService.getAll().pipe(
      map(images => fetchImagesSuccess({images})),
      catchError(() => of(fetchImagesFailure({
        error: 'Something went wrong'
      })))
    )
  )));

  // fetchCocktailInfo = createEffect(() => this.actions.pipe(
  //   ofType(fetchCocktailInfoRequest),
  //   mergeMap(({id}) => this.cocktailsService.getOneCocktail(id).pipe(
  //       map(cocktail => fetchCocktailInfoSuccess({cocktail})),
  //       catchError(() => of(fetchCocktailInfoFailure({
  //         error: 'Something went wrong'
  //       })))
  //     )
  //   )));
  //
  fetchImagesByUser = createEffect(() => this.actions.pipe(
    ofType(fetchImagesUserRequest),
    mergeMap(({userId}) => this.imageService.getImagesByUser(userId).pipe(
        map(images => fetchImagesUserSuccess({images})),
        catchError(() => of(fetchImagesUserFailure({
          error: 'Something went wrong'
        })))
      )
    )));

  createCocktail = createEffect(() => this.actions.pipe(
    ofType(createImageRequest),
    mergeMap(({imageData}) => this.imageService.createPhoto(imageData).pipe(
        map(() => createImageSuccess()),
        tap(() => {
          this.helpers.openSnackbar('Photo added');
          void this.router.navigate(['/']);
        }),
        catchError(() => of(createImageFailure({
          error: 'Something went wrong!'
        })))
      )
    ))
  );

  removeImage = createEffect(() => this.actions.pipe(
    ofType(removeImageRequest),
    mergeMap(({id}) => this.imageService.remove(id).pipe(
        map(() => removeImageSuccess()),
        tap(() => {
          this.helpers.openSnackbar('Photo deleted');
        }),
      )
    ))
  );

  constructor(
    private imageService: ImagesService,
    private actions: Actions,
    private helpers: HelpersService,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.user = store.select(state => state.users.user);
    this.user.subscribe(user => {
      this.userRole = user?.role;
      this.userId = <string>user?._id
    })
  }
}
