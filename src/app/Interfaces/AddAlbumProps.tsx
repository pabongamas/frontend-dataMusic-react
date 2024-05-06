import { Album } from "./AlbumInterface";

export interface AddAlbumProps {
    className?: string; // La clase CSS es opcional
    width?: string;
    height?: string;
    showText?: boolean;
    likedAlbums?:Album[];
    addOrRemoveAlbumLike?:()=>void;
  }
