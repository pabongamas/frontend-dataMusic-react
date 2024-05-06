import {Artist} from './ArtistInterface'
export interface Album {
    id:string;
    image: string;
    name: string;
    artist: Artist[];
    isAddedLike?:boolean;
  }
  