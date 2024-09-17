"use client"; // This is a client component 👈🏽
import { useLocalStorage } from "@/app/Hooks/UseLocalStorage";
import { useEffect, useState } from "react";
import { Album } from "@/app/Interfaces/AlbumInterface";
import axios from "axios";
const page = ({
  params,
}: {
  params: {
    artistId: string;
  };
}) => {
  const jwtToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWFpbHNpdG9AZ21haWwuY29tIiwiaXNzIjoiZGF0YU11c2ljIiwiZXhwIjoxNzI3ODc0NTUyLCJpYXQiOjE3MjY1Nzg1NTJ9.lgZ_yIDi5HtZQ5Gik8WYcFhZRdat2YPqPLoCGJEQzwc";
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
