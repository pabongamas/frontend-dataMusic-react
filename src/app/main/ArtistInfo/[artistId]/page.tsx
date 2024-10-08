"use client"; // This is a client component 👈🏽
import { useLocalStorage } from "@/app/Hooks/UseLocalStorage";
import { useEffect, useState } from "react";
import { Album } from "@/app/Interfaces/AlbumInterface";
import axios from "axios";
import Cookies from 'js-cookie';
const page = ({
  params,
}: {
  params: {
    artistId: string;
  };
}) => {
  const jwtToken = Cookies.get('jwtTokenDataMusic');
// Configuración de Axios con el JWT en la cabecera
const axiosConfig = {
  headers: {
    Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
    "Content-Type": "application/json",
  },
};
  useEffect(()=>{
    axios
    .get(
      "http://localhost:8090/datamusic/api/artists/"+params.artistId,
      axiosConfig
    )
    .then((response) => {
      // setResponseData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  },[])
};

export default page;
