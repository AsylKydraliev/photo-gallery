import { createAction, props } from '@ngrx/store';
import { Image, ImageData } from '../../models/image.model';

export const fetchImagesRequest = createAction(
  '[Images] Fetch Request'
);
export const fetchImagesSuccess = createAction(
  '[Images] Fetch Success',
  props<{images: Image[]}>()
);
export const fetchImagesFailure = createAction(
  '[Images] Fetch Failure',
  props<{error: string}>()
);

export const fetchImageInfoRequest = createAction(
  '[Image] Fetch Request',
  props<{id: string}>()
);
export const fetchImageInfoSuccess = createAction(
  '[Image] Fetch Success',
  props<{image: Image}>()
);
export const fetchImageInfoFailure = createAction(
  '[Image] Fetch Failure',
  props<{error: string}>()
);


export const fetchImagesUserRequest = createAction(
  '[ImagesUser] Fetch Request',
   props<{userId: string}>()
);
export const fetchImagesUserSuccess = createAction(
  '[ImagesUser] Fetch Success',
  props<{images: Image[]}>()
);
export const fetchImagesUserFailure = createAction(
  '[ImagesUser] Fetch Failure',
  props<{error: string}>()
);


export const createImageRequest = createAction(
  '[Image] Create Request',
  props<{imageData: ImageData}>()
);
export const createImageSuccess = createAction(
  '[Image] Create Success'
);
export const createImageFailure = createAction(
  '[Image] Create Failure',
  props<{error: string | null}>()
);

export const removeImageRequest = createAction(
  '[Image] Remove Request',
  props<{id: string}>()
);
export const removeImageSuccess = createAction('[Image] Remove Success');
