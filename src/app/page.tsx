"use client"; // This is a client component 👈🏽
import { useState } from "react";
import Image from "next/image";
import ListAlbum from "./components/albums/ListAlbum";
import NavBar from "./components/navbar/Navbar";
import { Album } from "./Interfaces/AlbumInterface";
import { useSearchParams } from 'next/navigation'


export default function Home() {
  //hook for search parameters in url
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;
  const pageForApi=currentPage-1;
  const [likedAlbums, setLikedAlbums] = useState<Album[]>([]);
  let parsedItem;

  if (typeof window !== 'undefined'){
    const localStorageItem = localStorage.getItem("LIKED_ALBUMS");
    if (!localStorageItem) {
      localStorage.setItem("LIKED_ALBUMS", JSON.stringify([]));
      parsedItem = [];
    } else {
      parsedItem = JSON.parse(localStorageItem);
    }
  }
 

  
  const handleAddLikedAlbum = (album: Album) => {
    if (!likedAlbums.some((likedAlbums) => likedAlbums.albumId === album.albumId)) {
      album.isAddedLike=true;
      setLikedAlbums([...likedAlbums, album]);
    }
  };
  const handleRemoveLikedAlbum=(album:Album)=>{
  const remove=likedAlbums.filter(likedAlbum => likedAlbum.albumId !== album.albumId);
   setLikedAlbums(remove);
  }
  return (
    <main className="min-h-screen ">
      <NavBar likedAlbums={likedAlbums} />
      <ListAlbum onAddLikedAlbum={handleAddLikedAlbum}  onRemoveLikedAlbum={handleRemoveLikedAlbum} pageForApi={pageForApi}/>
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
  console.log(likedAlbums);

  return (
    <main>
      <NavBar likedAlbums={likedAlbums} />
    </main>
    
  );
}
