"use client"; // This is a client component 👈🏽

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import toast from "react-hot-toast";
import { Songs } from "../Interfaces/Response/Response";
import { Album } from "../Interfaces/AlbumInterface";

export interface AudioPlayerContextType {
  isPlaying: boolean;
  audioUrl: string | null;
  playAudio: (url: string | undefined, token: string | undefined) => void;
  stopAudio: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  songCurrent: Songs | null;
  setCurrentSong: (song: Songs | null) => void;
  setDataAlbumFn: (albumData:Album |undefined) => void;
  dataAlbum:Album | undefined;
  nextSong:Songs|null;
  setNextSong:(song:Songs|null)=>void;
  previousSong:Songs|null;
  setPreviousSong:(song:Songs|null)=>void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // Referencia para el elemento de audio
  const [songCurrent, setSongCurrent] = useState<Songs | null>(Object);
  const [dataAlbum, setDataAlbum] = useState<Album | undefined>(Object);
  const [nextSong, setNextSong] = useState<Songs|null>(Object);
  const [previousSong, setPreviousSong] = useState<Songs|null>(Object);




  const playAudio = async (
    url?: string | undefined,
    token?: string | undefined
  ) => {
    if (url !== undefined) {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setAudioUrl(blobUrl);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
        setCurrentSong(null)
        setAudioUrl(null);
        toast.error("Error fetching audio, this song is not available");
      }
    } else {
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    setIsPlaying(false);
  };
  const setCurrentSong = (song: Songs | null) => {
    setSongCurrent(song);
  };
  const setDataAlbumFn=(albumData:Album|undefined)=>{
    setDataAlbum(albumData);
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        audioUrl,
        playAudio,
        stopAudio,
        audioRef,
        setCurrentSong,
        songCurrent,
        setDataAlbumFn,
        dataAlbum,
        nextSong,
        setNextSong,
        setPreviousSong,
        previousSong
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useLikedAlbums must be used within a LikedAlbumsProvider");
  }
  return context;
};
