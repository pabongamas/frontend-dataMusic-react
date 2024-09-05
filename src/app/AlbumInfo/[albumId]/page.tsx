"use client"; // This is a client component 👈🏽
import { useLocalStorage } from "@/app/Hooks/UseLocalStorage";
import { useEffect, useState } from "react";
import { Album } from "@/app/Interfaces/AlbumInterface";
import NavBar from "@/app/components/navbar/Navbar";
import { HeaderLikedAlbums } from "@/app/page";
export default function albumDetail({
  params,
}: {
  params: {
    albumId: string;
  };
}) {
  const likedAlbums = HeaderLikedAlbums();
  return (
    <div>
      <main>
        <NavBar likedAlbums={likedAlbums} />
        <div>aca va {params.albumId}</div>
      </main>
    </div>
  );
}
