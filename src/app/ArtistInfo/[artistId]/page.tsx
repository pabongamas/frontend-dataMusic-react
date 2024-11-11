"use client"; // This is a client component 👈🏽
import { useLocalStorage } from "@/app/Hooks/UseLocalStorage";
import { useEffect, useState } from "react";
import { Album } from "@/app/Interfaces/AlbumInterface";
import NavBar from "@/app/components/navbar/Navbar";
// import { HeaderLikedAlbums } from "@/app/page";
const page = ({
  params,
}: {
  params: {
    artistId: string;
  };
}) => {
  // const likedAlbums = HeaderLikedAlbums();
  return (
    <div>
      <main>
        <NavBar  />
        <div>aca va {params.artistId}</div>
      </main>
    </div>
  );
};

export default page;
