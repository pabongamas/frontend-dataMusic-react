"use client"; // This is a client component 👈🏽
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import ListAlbum from "./components/albums/ListAlbum";
import NavBar from "./components/navbar/Navbar";
import { Album } from "./Interfaces/AlbumInterface";
import { useSearchParams } from "next/navigation";
import { useLocalStorage } from "./Hooks/UseLocalStorage";

const NAME_LOCAL_STORAGE_LIKED_ALBUMS = "LIKED_ALBUMS";
export default function Home() {
  
}

