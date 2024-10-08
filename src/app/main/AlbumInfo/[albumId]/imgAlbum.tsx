"use client";
import { AlbumCard } from "@/app/components/albums/AlbumCard";
import { Album } from "@/app/Interfaces/AlbumInterface";
import React from "react";
import { useLikedAlbumsContext } from "@/app/Hooks/LikedAlbumsContext";

export function ImgAlbumWithContext({ album }: { album: Album }) {
  // const { likedAlbums, addLikedAlbum, removeLikedAlbum } =
  //   useLikedAlbumsContext();
  
  return (
    <AlbumCard
      isCard={false}
      // onAddLikedAlbum={addLikedAlbum}
      // onRemoveLikedAlbum={removeLikedAlbum}
      key={album.albumId}
      album={album}
      // isAlreadyLiked={
      //   likedAlbums.filter((albumLiked) => albumLiked.albumId === album.albumId)
      //     .length > 0
      // }
    />
  )
}
