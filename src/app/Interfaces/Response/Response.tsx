 import {Album} from "./../AlbumInterface";
 import { Pageable } from "./pageable";

 interface ResponseDataAlbums{
    albums:Album[],
    pageable:Pageable,
    elementsByPage:number,
    totalElements:number,
    totalPages:number
 }
export interface ResponseData {
    data?: ResponseDataAlbums; 
    date?:string;
    message?:string;
    state?:string;
  }
