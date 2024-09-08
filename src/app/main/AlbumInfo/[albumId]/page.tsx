"use client"; // This is a client component 👈🏽
import { useLocalStorage } from "@/app/Hooks/UseLocalStorage";
import { useEffect, useState } from "react";
import { Album } from "@/app/Interfaces/AlbumInterface";
export default function albumDetail({
  params,
}: {
  params: {
    albumId: string;
  };
}) {
 return(
  <div className="class k">
    {params.albumId}
  </div>
 );
}
