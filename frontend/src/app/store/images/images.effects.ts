import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { User } from '../../models/user.model';
import {
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess, fetchImagesUserFailure,
  fetchImagesUserRequest,
  fetchImagesUserSuccess
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
  //
  // createCocktail = createEffect(() => this.actions.pipe(
  //   ofType(createCocktailRequest),
  //   mergeMap(({cocktailData}) => this.cocktailsService.addCocktail(cocktailData).pipe(
  //       map(() => createCocktailSuccess()),
  //       tap(() => {
  //         if(this.userRole === 'admin'){
  //           this.helpers.openSnackbar('Cocktail added');
  //         }else {
  //           this.helpers.openSnackbar('Your cocktail is being reviewed by a moderator');
  //         }
  //         void this.router.navigate(['/']);
  //       }),
  //       catchError(() => of(createCocktailFailure({
  //         error: 'Something went wrong!'
  //       })))
  //     )
  //   ))
  // );
  //
  // removeCocktail = createEffect(() => this.actions.pipe(
  //   ofType(removeCocktailsRequest),
  //   mergeMap(({id}) => this.cocktailsService.remove(id).pipe(
  //       map(() => removeCocktailsSuccess()),
  //       tap(() => {
  //         this.helpers.openSnackbar('Cocktail deleted');
  //       }),
  //     )
  //   ))
  // );

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
