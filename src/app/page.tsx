"use client"; // This is a client component 👈🏽
import { useState } from "react";
import Image from "next/image";
import ListAlbum from "./components/albums/ListAlbum";
import NavBar from "./components/navbar/Navbar";
import { Album } from "./Interfaces/AlbumInterface";

export default function Home() {
  const [likedAlbums, setLikedAlbums] = useState<Album[]>([]);

  const localStorageItem = localStorage.getItem("LIKED_ALBUMS");
  let parsedItem;
  if (!localStorageItem) {
    localStorage.setItem("LIKED_ALBUMS", JSON.stringify([]));
    parsedItem = [];
  } else {
    parsedItem = JSON.parse(localStorageItem);
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
      <ListAlbum onAddLikedAlbum={handleAddLikedAlbum}  onRemoveLikedAlbum={handleRemoveLikedAlbum}/>
    </main>
    
  );
}
