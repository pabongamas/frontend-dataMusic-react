"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import Image from "next/image";
import ListAlbum from "./components/albums/ListAlbum";
import NavBar from "./components/navbar/Navbar";
import { Album } from "./Interfaces/AlbumInterface";
import { useSearchParams } from "next/navigation";
import { useLocalStorage } from "./Hooks/UseLocalStorage";

const NAME_LOCAL_STORAGE_LIKED_ALBUMS = "LIKED_ALBUMS";
export default function Home() {
  //hook for search parameters in url
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const currentPage = page ? parseInt(page, 10) : 1;
  const pageForApi = currentPage - 1;
  const [likedAlbums, setLikedAlbums] = useState<Album[]>([]);
  let parsedItem: Album[];
  //revisar posible bug aca al refrescar pagina y deslikear un album
  const [likedAlbumsStorage, saveLikedAlbumsStorage] = useLocalStorage(
    NAME_LOCAL_STORAGE_LIKED_ALBUMS,
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageItem = localStorage.getItem(NAME_LOCAL_STORAGE_LIKED_ALBUMS);
      let parsedItem;
      if (!localStorageItem) {
        localStorage.setItem(NAME_LOCAL_STORAGE_LIKED_ALBUMS, JSON.stringify([]));
        parsedItem = [];
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }
      setLikedAlbums(parsedItem); // Solo actualiza el estado una vez
    }
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente
  

  const handleAddLikedAlbum = (album: Album) => {
    if (
      !likedAlbums.some((likedAlbums) => likedAlbums.albumId === album.albumId)
    ) {
      album.isAddedLike = true;
      setLikedAlbums([...likedAlbums, album]);
      saveLikedAlbumsStorage([...likedAlbums, album]);
    }
  };
  const handleRemoveLikedAlbum = (album: Album) => {
    const remove = likedAlbums.filter((likedAlbum) => {
      return likedAlbum.albumId !== album.albumId;
    });
    setLikedAlbums(remove);
    saveLikedAlbumsStorage(remove);
  };
  return (
    <main className="min-h-screen ">
      <NavBar likedAlbums={likedAlbums} />
      <ListAlbum
        onAddLikedAlbum={handleAddLikedAlbum}
        onRemoveLikedAlbum={handleRemoveLikedAlbum}
        pageForApi={pageForApi}
        likedAlbumsStorage={likedAlbumsStorage}
      />
    </main>
  );
}
export function HeaderLikedAlbums() {
  const [likedAlbumsStorage, saveLikedAlbumsStorage] = useLocalStorage(
    NAME_LOCAL_STORAGE_LIKED_ALBUMS,
    []
  );
  const [likedAlbums, setLikedAlbums] = useState<Album[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageItem = localStorage.getItem(NAME_LOCAL_STORAGE_LIKED_ALBUMS);
      let parsedItem;
      if (!localStorageItem) {
        localStorage.setItem(NAME_LOCAL_STORAGE_LIKED_ALBUMS, JSON.stringify([]));
        parsedItem = [];
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }
      setLikedAlbums(parsedItem); // Solo actualiza el estado una vez
    }
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  return likedAlbums; 
}
