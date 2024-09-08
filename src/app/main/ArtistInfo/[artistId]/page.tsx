"use client"; // This is a client component 👈🏽
import { useLocalStorage } from "@/app/Hooks/UseLocalStorage";
import { useEffect, useState } from "react";
import { Album } from "@/app/Interfaces/AlbumInterface";
const page = ({
  params,
}: {
  params: {
    artistId: string;
  };
}) => {
};

export default page;
