 import {Album} from "./../AlbumInterface";
 import {Artist} from './../ArtistInterface'
 import { Pageable } from "./pageable";

interface errorResponse{
  error:string
}
interface AdditionalData {
  [key: string]: any;
}

 export interface DefaultResponse{
  date:string,
  data?:AdditionalData,
  errors:errorResponse,
  message:string,
  state:boolean
 }
 interface Gender{
   genderId:number;
   name:string;
 }

 interface ResponseDataAlbums{
    albums:Album[],
    pageable:Pageable,
    elementsByPage:number,
    totalElements:number,
    totalPages:number
 }
 export interface Colors{
  frecuencia:number,
  colorHex:string
 }
 export interface Songs{
  songId:number,
  name:string,
  duration:number,
  numberSong:number,
  explicit:boolean,
  isLikedByCurrentUser?:boolean
 }
 interface ResponseAlbum{
   album:Album,
   artists:Artist,
   gender:Gender
   colors:Colors[];
   songs:Songs[];
   routeThumb:string;
 }
export interface ResponseData {
    data: ResponseDataAlbums; 
    date?:string;
    message?:string;
    state?:string;
  }
export interface ResponseDataAlbum{
   data?:ResponseAlbum;
   date?:string;
   message?:string;
   state?:string;
}