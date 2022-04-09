import { createReducer, on } from '@ngrx/store';
import { ImagesState } from '../types';
import { fetchImagesFailure, fetchImagesRequest, fetchImagesSuccess } from './images.actions';

const initialState: ImagesState = {
  images: [],
  image: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
}
export const imagesReducer = createReducer(
  initialState,
  on(fetchImagesRequest, state => ({...state, fetchLoading: true})),
  on(fetchImagesSuccess, (state, {images}) => ({...state, fetchLoading: false, images})),
  on(fetchImagesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  // on(fetchCocktailInfoRequest, state => ({...state, fetchLoading: true})),
  // on(fetchCocktailInfoSuccess, (state, {cocktail}) => ({...state, fetchLoading: false, cocktail})),
  // on(fetchCocktailInfoFailure, (state, {error}) => ({...state, fetchLoading: true, fetchError: error})),
  //
  // on(fetchCocktailsUserRequest, state => ({...state, fetchLoading: true})),
  // on(fetchCocktailsUserSuccess, (state, {cocktails}) => ({...state, fetchLoading: false, cocktails})),
  // on(fetchCocktailsUserFailure, (state, {error}) => ({...state, fetchLoading: true, fetchError: error})),
  //
  // on(createCocktailRequest, state => ({...state, createLoading: true})),
  // on(createCocktailSuccess, state => ({...state, createLoading: false})),
  // on(createCocktailFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
  //
  // on(publishCocktailRequest, state => ({...state, publishLoading: true})),
  // on(publishCocktailSuccess, state => ({...state, publishLoading: false})),
  //
  // on(addRatingRequest, state => ({...state, fetchLoading: true})),
  // on(addRatingSuccess, (state, {cocktail}) => ({...state, fetchLoading: false, cocktail})),
  //
  // on(removeCocktailsRequest, (state, {id}) => {
  //   const update = state.cocktails.filter(cocktail => {
  //     return cocktail._id !== id;
  //   });
  //
  //   return {...state, cocktails: update, removeLoading: true}
  // }),
  // on(removeCocktailsSuccess, state => ({...state, publishLoading: false})),
)
