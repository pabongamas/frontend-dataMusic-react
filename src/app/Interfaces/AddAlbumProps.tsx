import { Album } from "./AlbumInterface";
import {LikedAlbumsContextType} from './../Hooks/LikedAlbumsContext'

export interface AddAlbumProps {
    className?: string; // La clase CSS es opcional
    width?: string;
    height?: string;
    showText?: boolean;
    likedAlbums?:Album[];
    addOrRemoveAlbumLike?:(event: React.MouseEvent)=>void;
  }
