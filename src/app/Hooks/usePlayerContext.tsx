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

export interface AudioPlayerContextType {
  isPlaying: boolean;
  audioUrl: string | null;
  playAudio: (url: string | undefined, token: string | undefined) => void;
  stopAudio: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  songCurrent: Songs | null;
  setCurrentSong: (song: Songs | null) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // Referencia para el elemento de audio
  const [songCurrent, setSongCurrent] = useState<Songs | null>(Object);

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
        toast.error("Error fetching audio");
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
