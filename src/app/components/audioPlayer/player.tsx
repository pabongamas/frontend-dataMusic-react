"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { useAudioPlayerContext } from "../../Hooks/usePlayerContext";
import { Button } from "../ui/Button";
import { Slider } from "../ui/Slider";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";

function AudioPlayer() {
  const jwtToken = Cookies.get("jwtTokenDataMusic");
  const URL_ARTIST_INFO = "/main/ArtistInfo/";
  const {
    isPlaying,
    playAudio,
    audioUrl,
    stopAudio,
    audioRef,
    songCurrent,
    dataAlbum,
    nextSong,
    setCurrentSong,
    previousSong,
  } = useAudioPlayerContext();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioUrl, audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [audioUrl, audioRef]);

  if (!audioUrl) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else if (audioRef.current) {
      playAudio(undefined, undefined);
      audioRef.current.play();
    }
  };
  const nextTrack = () => {
    if(nextSong!==null){
      setCurrentSong(nextSong);
      playAudio(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/songs/play/${nextSong.songId}`,
        jwtToken
      );  
    }
  };
  const previousTrack = () => {
    if(previousSong!==null){
      setCurrentSong(previousSong);
      playAudio(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/songs/play/${previousSong.songId}`,
        jwtToken
      );
    }
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 text-white p-4 shadow-lg">
      <audio ref={audioRef} src={audioUrl} className="hidden" />
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={
               dataAlbum?.pathImageAlbum ||
              "/placeholder.svg"
            }
            alt="Album Art"
            className="w-14 h-14 rounded-md"
          />
          <div>
            <h3 className="font-semibold">
              {songCurrent?.name || "Unknown Track"}
            </h3>

            {dataAlbum?.artists !== undefined &&
              dataAlbum.artists.length > 0 &&
              dataAlbum.artists.map((artist, index) => (
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
        <div className="flex-1 max-w-xl mx-8">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <Button variant="ghost" size="icon" onClick={() => previousTrack()}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => nextTrack()}>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={([value]) => handleSeek(value)}
              className="w-full"
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {volume === 0 ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={([value]) => handleVolumeChange(value)}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
