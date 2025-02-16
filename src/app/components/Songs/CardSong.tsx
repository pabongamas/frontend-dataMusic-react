"use client";

import { Songs } from "@/app/Interfaces/Response/Response";
import { useEffect, useState } from "react";
import { PlayIcon, PauseIcon, HeartIcon } from "lucide-react";
import { Album, APIResponseItem } from "@/app/Interfaces/AlbumInterface";
import Link from "next/link";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import Player from "../audioPlayer/player";
import { useAudioPlayerContext } from './../../Hooks/usePlayerContext';


export default function CardSong({
  isEven,
  song,
  artists,
  albumData,
  nextSong,
  previousSong
}: {
  isEven: boolean;
  song: Songs;
  artists: APIResponseItem[] | undefined;
  albumData: Album|undefined;
  nextSong:Songs|null;
  previousSong:Songs|null;
}) {
  const jwtToken = Cookies.get('jwtTokenDataMusic');
  // Configuración de Axios con el JWT en la cabecera
  const URL_ARTIST_INFO = "/main/ArtistInfo/";
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState(song.isLikedByCurrentUser);

  //context for handle to play songs
  const { playAudio,stopAudio,setCurrentSong,setDataAlbumFn,songCurrent,audioRef,isPlaying,setNextSong,setPreviousSong } = useAudioPlayerContext();


  useEffect(() => {
    if (songCurrent && song.songId === songCurrent.songId) {
      setIsPlayingSong(isPlaying);
      setNextSong(nextSong);
      setPreviousSong(previousSong);
    }
  }, [songCurrent, isPlaying, song.songId]);

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
        process.env.NEXT_PUBLIC_BACKEND_API_URL+"/songUser/like/" + song.songId,
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
        process.env.NEXT_PUBLIC_BACKEND_API_URL+"/songUser/like/" + song.songId,
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

  function actionPlay(song:Songs){
    setIsPlayingSong(!isPlayingSong);
   
    if(!isPlayingSong){
      if(songCurrent?.songId!==song.songId){
        setCurrentSong(song);
        setDataAlbumFn(albumData);
        playAudio(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/songs/play/${song.songId}`,jwtToken);
      }else{
        if(audioRef!==null){
          playAudio(undefined, undefined);
          audioRef.current?.play();
          setIsPlayingSong(true);
        }
      }
    }else{
        stopAudio();
        if(songCurrent?.songId!==song.songId){
          setCurrentSong(song);
          setDataAlbumFn(albumData);
          setIsPlayingSong(true);
          playAudio(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/songs/play/${song.songId}`,jwtToken);
        }
    }
  }
  
  return (
    <div
      className={`flex items-center px-4 py-2  bg-rowList  hover:bg-rowListH  group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-8 text-right mr-4">
        {isHovered || songCurrent!==null && songCurrent?.songId==song.songId   ? (
          <button
            onClick={() =>actionPlay(song)}
            className="text-white hover:text-green-400 transition-colors duration-200"
          >
            {isPlayingSong &&(songCurrent?.songId==song.songId) ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
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

export function calcSecs(secs: number) {
  const minutes = Math.floor(secs / 60);
  const remainingSeconds = secs % 60;
  // Asegurarse de que los segundos siempre tengan dos dígitos
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
