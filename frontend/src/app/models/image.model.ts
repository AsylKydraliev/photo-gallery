export interface Image {
  readonly _id: string,
  readonly user: {
    _id: string,
    displayName: string
  },
  readonly name: string,
  readonly image: string,
}

export class ImageModel {
  constructor(
    public _id: string,
    public user: {
      _id: string,
      displayName: string
    },
    public name: string,
    public image: string,
  ) {}
}

export interface ImageData {
  user: string,
  name: string,
  image: File | null,
}
