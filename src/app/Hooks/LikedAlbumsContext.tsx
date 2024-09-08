"use client"; // This is a client component 👈🏽
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Album } from "../Interfaces/AlbumInterface";
import { useLocalStorage } from "./UseLocalStorage";

export interface LikedAlbumsContextType {
  likedAlbums: Album[];
  addLikedAlbum: (album: Album) => void;
  removeLikedAlbum: (album: Album) => void;
}

const LikedAlbumsContext = createContext<LikedAlbumsContextType | undefined>(undefined);

export const LikedAlbumsProvider = ({ children }: { children: ReactNode }) => {
  const [likedAlbums, setLikedAlbums] = useState<Album[]>([]);
  const [likedAlbumsStorage, saveLikedAlbumsStorage] = useLocalStorage(
    "LIKED_ALBUMS",
    []
  );

  useEffect(()=>{
     const localStorageItem = localStorage.getItem("LIKED_ALBUMS");
    if (localStorageItem) {
      setLikedAlbums(JSON.parse(localStorageItem));
    }
  },[]);

  const addLikedAlbum = (album: Album) => {
    setLikedAlbums((prev) => [...prev, album]);
    saveLikedAlbumsStorage([...likedAlbums, album]);
  };

  const removeLikedAlbum = (album: Album) => {
    const remove = likedAlbums.filter((likedAlbum) => {
      return likedAlbum.albumId !== album.albumId;
    });
    setLikedAlbums(remove);
    saveLikedAlbumsStorage(remove);
  };

  return (
    <LikedAlbumsContext.Provider value={{ likedAlbums, addLikedAlbum, removeLikedAlbum }}>
      {children}
    </LikedAlbumsContext.Provider>
  );
};

export const useLikedAlbumsContext = () => {
  const context = useContext(LikedAlbumsContext);
  if (!context) {
    throw new Error("useLikedAlbums must be used within a LikedAlbumsProvider");
  }
  return context;
};