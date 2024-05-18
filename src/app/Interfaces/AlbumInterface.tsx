import {Artist} from './ArtistInterface'
export interface Album {
    albumId:string;
    image: string;
    name: string;
    artists: Artist[];
    isAddedLike?:boolean;
    imgAlbum?:string
  }
  