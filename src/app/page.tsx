"use client"; // This is a client component 👈🏽
import { useState } from "react";
import Image from "next/image";
import ListAlbum from "./components/albums/ListAlbum";
import NavBar from "./components/navbar/Navbar";
import { Album } from "./Interfaces/AlbumInterface";
import { useSearchParams } from 'next/navigation'
import {useLocalStorage} from '../app/useStateFunctions/UseLocalStorage'


export default function Home() {
  const NAME_LOCAL_STORAGE_LIKED_ALBUMS='LIKED_ALBUMS';
  //hook for search parameters in url
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;
  const pageForApi=currentPage-1;
  const [likedAlbums, setLikedAlbums] = useState<Album[]>([]);
  let parsedItem:Album[];
  //revisar posible bug aca al refrescar pagina y deslikear un album
  const [likedAlbumsStorage, saveLikedAlbumsStorage] = useLocalStorage(NAME_LOCAL_STORAGE_LIKED_ALBUMS,[]);
 

  if (typeof window !== 'undefined'){
    const localStorageItem = localStorage.getItem(NAME_LOCAL_STORAGE_LIKED_ALBUMS);
    console.log(localStorageItem);
    if (!localStorageItem) {
      localStorage.setItem(NAME_LOCAL_STORAGE_LIKED_ALBUMS, JSON.stringify([]));
      parsedItem = [];
    } else {
      parsedItem = JSON.parse(localStorageItem);
    }
  }
 

  
  const handleAddLikedAlbum = (album: Album) => {
    if (!likedAlbums.some((likedAlbums) => likedAlbums.albumId === album.albumId)) {
      album.isAddedLike=true;
      setLikedAlbums([...likedAlbums, album]);
      saveLikedAlbumsStorage([...parsedItem,album]);
    }
  };
  const handleRemoveLikedAlbum=(album:Album)=>{
  const remove=likedAlbums.filter(likedAlbum => likedAlbum.albumId !== album.albumId);
   setLikedAlbums(remove);
   saveLikedAlbumsStorage(remove);
  }
  return (
    <main className="min-h-screen ">
      <NavBar likedAlbums={likedAlbums} />
      <ListAlbum onAddLikedAlbum={handleAddLikedAlbum}  onRemoveLikedAlbum={handleRemoveLikedAlbum} pageForApi={pageForApi} likedAlbumsStorage={likedAlbumsStorage}/>
    </main>
    
  );
}
export function Header(){
  const [likedAlbums, setLikedAlbums] = useState<Album[]>([]);

  const localStorageItem = localStorage.getItem("LIKED_ALBUMS");
  let parsedItem;
  if (!localStorageItem) {
    localStorage.setItem("LIKED_ALBUMS", JSON.stringify([]));
    parsedItem = [];
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  return (
    <main>
      <NavBar likedAlbums={likedAlbums} />
    </main>
    
  );
}
