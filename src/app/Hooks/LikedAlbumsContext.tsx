"use client"; // This is a client component 👈🏽
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Album } from "../Interfaces/AlbumInterface";
import { useLocalStorage } from "./UseLocalStorage";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export interface LikedAlbumsContextType {
  likedAlbums: Album[];
  addLikedAlbum: (album: Album) => Promise<boolean | undefined>;
  removeLikedAlbum: (album: Album) => void;
  initialLikedAlbums: (albums: Album[]) => void;
}

const LikedAlbumsContext = createContext<LikedAlbumsContextType | undefined>(
  undefined
);

export const LikedAlbumsProvider = ({ children }: { children: ReactNode }) => {
  const jwtToken = Cookies.get("jwtTokenDataMusic");
  const [likedAlbums, setLikedAlbums] = useState<Album[]>([]);
  const [likedAlbumsStorage, saveLikedAlbumsStorage] = useLocalStorage(
    "LIKED_ALBUMS",
    []
  );

  useEffect(() => {
    const localStorageItem = localStorage.getItem("LIKED_ALBUMS");
    if (localStorageItem) {
      setLikedAlbums(JSON.parse(localStorageItem));
    }
  }, []);

  const addLikedAlbum = async (album: Album) => {
    // Configuración de Axios con el JWT en la cabecera
    const axiosConfig: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
      },
      cache: "no-cache",
    };
    const resSongLiked = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API_URL +
        "/AlbumUser/like/" +
        album.albumId,
      axiosConfig
    );
    const response = await resSongLiked.json();
    if (response.state) {
      if (response.data.liked) {
        setLikedAlbums((prev) => [...prev, album]);
        saveLikedAlbumsStorage([...likedAlbums, album]);
        toast.success("Added to Liked Albums");
        return true;
      }
      return false;
    } else {
      toast.error(response.message);
      return false;
    }
  };

  const removeLikedAlbum = async (album: Album) => {
    const remove = likedAlbums.filter((likedAlbum) => {
      return likedAlbum.albumId !== album.albumId;
    });
    // Configuración de Axios con el JWT en la cabecera
    const axiosConfig: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
      },
      cache: "no-cache",
    };
    const resSongDisLiked = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API_URL +
        "/AlbumUser/like/" +
        album.albumId,
      axiosConfig
    );
    const response = await resSongDisLiked.json();
    if (response.state) {
      if (response.data.disliked) {
        setLikedAlbums(remove);
        saveLikedAlbumsStorage(remove);
        toast.success("Removed from Liked Albums");
      }
    } else {
      toast.error(response.message);
      return false;
    }
  };
  const initialLikedAlbums = (data: Album[]) => {
    setLikedAlbums(data);
    saveLikedAlbumsStorage(data);
  };

  return (
    <LikedAlbumsContext.Provider
      value={{
        likedAlbums,
        addLikedAlbum,
        removeLikedAlbum,
        initialLikedAlbums,
      }}
    >
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
