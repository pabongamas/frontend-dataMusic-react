"use client";

import { Songs } from "@/app/Interfaces/Response/Response";
import { useEffect, useState } from "react";
import { PlayIcon, PauseIcon, HeartIcon } from "lucide-react";
import { APIResponseItem } from "@/app/Interfaces/AlbumInterface";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CardSong({
  isEven,
  song,
  artists,
}: {
  isEven: boolean;
  song: Songs;
  artists: APIResponseItem[] | undefined;
}) {
  const jwtToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWFpbHNpdG9AZ21haWwuY29tIiwiaXNzIjoiZGF0YU11c2ljIiwiZXhwIjoxNzI3ODc0NTUyLCJpYXQiOjE3MjY1Nzg1NTJ9.lgZ_yIDi5HtZQ5Gik8WYcFhZRdat2YPqPLoCGJEQzwc";
  // Configuración de Axios con el JWT en la cabecera
  const URL_ARTIST_INFO = "/main/ArtistInfo/";
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(song.isLikedByCurrentUser);

  async function actionLikedSong(song: Songs) {
    if (!isLiked) {
      // Configuración de Axios con el JWT en la cabecera
      const axiosConfig: RequestInit = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
        },
        cache: "no-cache",
      };
      const resSongLiked = await fetch(
        "http://localhost:8090/datamusic/api/songUser/like/" + song.songId,
        axiosConfig
      );
      const response = await resSongLiked.json();
      if (response.state) {
        toast.success("Added to Liked Songs");
      } else {
        toast.error(response.message);
        return false;
      }
    } else {
      // Configuración de Axios con el JWT en la cabecera
      const axiosConfig: RequestInit = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
        },
        cache: "no-cache",
      };
      const resSongDisLiked = await fetch(
        "http://localhost:8090/datamusic/api/songUser/like/" + song.songId,
        axiosConfig
      );
      const response = await resSongDisLiked.json();
      if (response.state) {
        toast.success("Removed from Liked Songs");
      } else {
        toast.error(response.message);
        return false;
      }
    }
    setIsLiked(!isLiked);
  }

  useEffect(() => {
    setIsLiked(song.isLikedByCurrentUser); // Actualiza el estado si el prop cambia
  }, [song.isLikedByCurrentUser]);
  return (
    <div
      className={`flex items-center px-4 py-2  bg-rowList  hover:bg-rowListH  group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-8 text-right mr-4">
        {isHovered ? (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:text-green-400 transition-colors duration-200"
          >
            {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </button>
        ) : (
          <span className="text-gray-400 group-hover:text-white">
            {song.numberSong}
          </span>
        )}
      </div>
      <div className="flex-grow">
        <p className="text-white font-medium">{song.name}</p>
        <div className="flex items-center text-sm text-gray-400">
          {song.explicit && (
            <span className="mr-2 px-1 bg-gray-700 text-gray-300 text-xs uppercase rounded">
              E
            </span>
          )}
          {artists !== undefined &&
            artists.length > 0 &&
            artists.map((artist, index) => (
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
      </div>
      <div className="flex items-center space-x-4">
        <button
          title={`${isLiked ? "You liked!" : "Add to Liked Songs"}`}
          onClick={() => {
            actionLikedSong(song);
          }}
          className={` group-hover:opacity-100 transition-opacity duration-200 ${
            isLiked
              ? "text-green-500 "
              : "text-white hover:text-green-400 opacity-0"
          }`}
        >
          <HeartIcon size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>
        <span className="text-sm text-gray-400 w-12 text-right">
          {calcSecs(song.duration)}
        </span>
      </div>
    </div>
  );
}

function calcSecs(secs: number) {
  const minutes = Math.floor(secs / 60);
  const remainingSeconds = secs % 60;
  // Asegurarse de que los segundos siempre tengan dos dígitos
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
