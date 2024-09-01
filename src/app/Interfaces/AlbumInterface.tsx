import {Artist} from './ArtistInterface'

interface APIResponseItem {
  artist: Artist;
}
export interface Album {
    albumId:string;
    image: string;
    name: string;
    artists: APIResponseItem[];
    isAddedLike?:boolean;
    imgAlbum?:string
  }
  