import {Artist} from './ArtistInterface'

export interface APIResponseItem {
  artist: Artist;
}
interface Gender{
  genderId:number;
  name:string;
}
export interface Album {
    albumId:string;
    image: string;
    name: string;
    artists: APIResponseItem[];
    isAddedLike?:boolean;
    imgAlbum?:string;
    pathImageAlbum?:string;
    gender?:Gender;
    year?:string;
    nameFile?:string;
  }
  