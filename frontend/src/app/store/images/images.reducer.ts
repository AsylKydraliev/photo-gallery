import { createReducer, on } from '@ngrx/store';
import { ImagesState } from '../types';
import {
  createImageFailure,
  createImageRequest, createImageSuccess, fetchImageInfoFailure, fetchImageInfoRequest, fetchImageInfoSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess, fetchImagesUserFailure,
  fetchImagesUserRequest,
  fetchImagesUserSuccess, removeImageRequest, removeImageSuccess
} from './images.actions';

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

  on(fetchImageInfoRequest, state => ({...state, fetchLoading: true})),
  on(fetchImageInfoSuccess, (state, {image}) => ({...state, fetchLoading: false, image})),
  on(fetchImageInfoFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(fetchImagesUserRequest, state => ({...state, fetchLoading: true})),
  on(fetchImagesUserSuccess, (state, {images}) => ({...state, fetchLoading: false, images})),
  on(fetchImagesUserFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createImageRequest, state => ({...state, createLoading: true})),
  on(createImageSuccess, state => ({...state, createLoading: false})),
  on(createImageFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(removeImageRequest, (state, {id}) => {
    const update = state.images.filter(image => {
      return image._id !== id;
    });

    return {...state, images: update, removeLoading: true}
  }),
  on(removeImageSuccess, state => ({...state, removeLoading: false})),
)
