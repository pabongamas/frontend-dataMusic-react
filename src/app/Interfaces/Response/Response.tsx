 import {Album} from "./../AlbumInterface";

 interface ResponseDataAlbums{
    albums:Album[];
 }
export interface ResponseData {
    data?: ResponseDataAlbums; 
    date?:string;
    message?:string;
    state?:string;
  }
