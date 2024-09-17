import { useLocalStorage } from "@/app/Hooks/UseLocalStorage";
import { useEffect, useState } from "react";
import { Album } from "@/app/Interfaces/AlbumInterface";
import axios from "axios";
import {
  Colors,
  ResponseDataAlbum,
  Songs,
} from "@/app/Interfaces/Response/Response";
import Image from "next/image";
import Link from "next/link";
import { json } from "stream/consumers";
import ListSong from "@/app/components/Songs/ListSong";
import notFound from "../../../../../public/img/notFound.png";
import { AlbumCard } from "@/app/components/albums/AlbumCard";
import {ImgAlbumWithContext} from "./imgAlbum";
// import { useLikedAlbumsContext } from "@/app/Hooks/LikedAlbumsContext";

export default async function albumDetail({
  params,
}: {
  params: {
    albumId: string;
  };
}) {
  // const { likedAlbums, addLikedAlbum, removeLikedAlbum } = useLikedAlbumsContext();
  const URL_ARTIST_INFO = "/main/ArtistInfo/";
  // const [responseDataAlbum, setResponseDataAlbum] = useState<ResponseDataAlbum>({});
  const jwtToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWFpbHNpdG9AZ21haWwuY29tIiwiaXNzIjoiZGF0YU11c2ljIiwiZXhwIjoxNzI3ODc0NTUyLCJpYXQiOjE3MjY1Nzg1NTJ9.lgZ_yIDi5HtZQ5Gik8WYcFhZRdat2YPqPLoCGJEQzwc";
  // Configuración de Axios con el JWT en la cabecera
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  };
  function generateGradient(colors: Colors[]): string {
    if (colors !== undefined) {
      if (colors.length === 0)
        return "linear-gradient(to bottom, #121212, #121212)";
      if (colors.length === 1)
        return `linear-gradient(to bottom, ${colors[0].colorHex}, #121212)`;
      const gradientStops = colors.map((color, index) => {
        const percentage = (index / (colors.length - 1)) * 100;
        return `${color.colorHex} ${percentage}%`;
      });

      return `linear-gradient(to bottom, ${gradientStops.join(", ")})`;
    } else {
      return "linear-gradient(to bottom, #121212, #121212)";
    }
  }

  // await new Promise(resolve => setTimeout(resolve, 5000))
  const resAlbum = await fetch(
    "http://localhost:8090/datamusic/api/albums/" + params.albumId,
    axiosConfig
  );
  let variableGetDataAlbum: Album | undefined;
  let colorsAlbum: Colors[];
  var listSongs: Songs[] = [];
  let gradientClasses;
  if (resAlbum.ok) {
    const jsonDat: ResponseDataAlbum = await resAlbum.json();
    if (jsonDat.data?.album) {
      variableGetDataAlbum = jsonDat.data.album;
      colorsAlbum = jsonDat.data.colors;
      gradientClasses = generateGradient(colorsAlbum);
      listSongs = jsonDat.data.songs;
    }
  } else {
    throw new Error(`Error: ${resAlbum.status} ${resAlbum.statusText}`);
  }

  return (
    <div className="min-h-screen text-white">
      <div style={{ background: gradientClasses }}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 ">
            <div className="w-64 h-64 flex-shrink-0 bg-gray-700 flex items-center justify-center rounded rounded-lg ">
              {variableGetDataAlbum !== undefined && (
                <picture className="w-full">
                  {/* <Image
                    src={`${variableGetDataAlbum?.imgAlbum? "data:image/png;base64," + variableGetDataAlbum?.imgAlbum:notFound.src}`
                     
                    }
                    priority={true}
                    alt={"photo by " + variableGetDataAlbum?.name}
                    width={`${variableGetDataAlbum?.imgAlbum? 100:notFound.width}`}
                    height={`${variableGetDataAlbum?.imgAlbum? 100:notFound.height}`}
                    className="rounded rounded-lg w-full   h-full"
                  /> */}
                  <ImgAlbumWithContext album={variableGetDataAlbum}/>
                </picture>
              )}
            </div>
            <div className="w-64 h-64  flex-1 flex items-center ">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium uppercase tracking-wider">
                  Álbum
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mt-2">
                  {variableGetDataAlbum?.name}
                </h1>
                <div className="md:flex md:items-center ">
                <div className="flex items-center gap-1">
                  {variableGetDataAlbum?.artists !== undefined &&
                    variableGetDataAlbum.artists.length > 0 &&
                    variableGetDataAlbum.artists.map((artist, index) => (
                      <Link
                        key={artist.artist.artistId}
                        href={URL_ARTIST_INFO + artist.artist.artistId}
                        className="hover:underline cursor-pointer text-sub"
                      >
                        <span
                          key={artist.artist.artistId}
                          className="text-sm text-gray-300"
                        >
                          {index > 0 && ", "}
                          {artist.artist.name}
                        </span>
                      </Link>
                    ))}
                 
                </div>
                <div className="text-sm text-gray-300">
                    {" "}
                    <span>•</span> {variableGetDataAlbum?.year} <span>•</span>{" "}
                    {listSongs.length} Song{listSongs.length > 1 ? "s" : " "},
                    {calcTotalDuration(listSongs)}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        {listSongs.length > 0 && (
          <div className="ListSongs">
            <ListSong
              data={listSongs}
              artists={variableGetDataAlbum?.artists}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function calcTotalDuration(songs: Songs[]) {
  const totalSeconds = songs.reduce((total, song) => total + song.duration, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (seconds === 0 && hours===0 && minutes===0 ) {
    return "";
  }
  // Formatear el resultado en "horas:minutos:segundos"
  if (hours > 0) {
    return ` ${hours}h ${minutes}m`; // Muestra solo horas y minutos
  } else {
    return ` ${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`; // Muestra minutos y segundos si no hay horas
  }
}
