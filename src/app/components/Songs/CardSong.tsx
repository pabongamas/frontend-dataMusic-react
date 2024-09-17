"use client";

import { Songs } from "@/app/Interfaces/Response/Response";
import { useState } from "react";
import { PlayIcon, PauseIcon, HeartIcon } from "lucide-react";
import { APIResponseItem } from "@/app/Interfaces/AlbumInterface";
import Link from "next/link";

// interface Song {
//   songId: number;
//   name: string;
//   duration: string;
//   trackNumber?: number;
//   // Simulamos datos adicionales
//   artists?: string[];
//   isExplicit?: boolean;
//   popularity?: number; // 0-100
// }

// interface CardSongProps {
//   song: Song;
//   isEven: boolean;
// }

// export  function CardSong({ song, isEven }: CardSongProps) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);

//   return (
//     <div
//       className={`flex items-center px-4 py-2 rounded-md ${
//         isEven ? "bg-gray-900" : "bg-black"
//       } hover:bg-gray-800 group`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="w-8 text-right mr-4">
//         {isHovered ? (
//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="text-white hover:text-green-400 transition-colors duration-200"
//           >
//             {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
//           </button>
//         ) : (
//           <span className="text-gray-400 group-hover:text-white">
//             {song.trackNumber}
//           </span>
//         )}
//       </div>
//       <div className="flex-grow">
//         <p className="text-white font-medium">{song.name}</p>
//         <div className="flex items-center text-sm text-gray-400">
//           {song.isExplicit && (
//             <span className="mr-2 px-1 bg-gray-700 text-gray-300 text-xs uppercase rounded">
//               E
//             </span>
//           )}
//           {/* {song.artists.join(", ")} */}
//         </div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={() => setIsLiked(!isLiked)}
//           className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
//             isLiked ? "text-green-500" : "text-white hover:text-green-400"
//           }`}
//         >
//           <HeartIcon size={16} fill={isLiked ? 'currentColor' : 'none'} />
//         </button>
//         <span className="text-sm text-gray-400 w-12 text-right">
//           {song.duration}
//         </span>
//       </div>
//     </div>
//   );
// }

// // Componente para mostrar la lista de canciones
// export function TrackList() {
//   const songs: Song[] = [
//     {
//         songId: 1,
//       name: "Canción 1",
//       duration: "3:45",
//       trackNumber: 1,
//       artists: ["Artista 1"],
//       isExplicit: false,
//       popularity: 85,
//     },
//     {
//         songId:2,
//       name: "Canción 2",
//       duration: "4:20",
//       trackNumber: 2,
//       artists: ["Artista 1", "Artista 2"],
//       isExplicit: true,
//       popularity: 92,
//     },
//     {
//         songId:3,
//       name: "Canción 3",
//       duration: "3:30",
//       trackNumber: 3,
//       artists: ["Artista 1"],
//       isExplicit: false,
//       popularity: 78,
//     },
//     {
//         songId: 4,
//       name: "Canción 4",
//       duration: "5:10",
//       trackNumber: 4,
//       artists: ["Artista 1", "Artista 3"],
//       isExplicit: false,
//       popularity: 88,
//     },
//     {
//         songId:5,
//       name: "Canción 5",
//       duration: "3:55",
//       trackNumber: 5,
//       artists: ["Artista 1"],
//       isExplicit: true,
//       popularity: 95,
//     },
//   ];

//   return (
//     <div className="mt-8 space-y-1">
//       {songs.map((song, index) => (
//         <CardSong key={song.songId} song={song} isEven={index % 2 === 0} />
//       ))}
//     </div>
//   );
// }

export default function CardSong({
  isEven,
  song,
  artists,
}: {
  isEven: boolean;
  song: Songs;
  artists: APIResponseItem[] | undefined;
}) {
  const URL_ARTIST_INFO = "/main/ArtistInfo/";
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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
        <button title={`${isLiked?"You liked!":"Add to Liked Songs"}`}
          onClick={() => setIsLiked(!isLiked)}
          className={` group-hover:opacity-100 transition-opacity duration-200 ${
            isLiked ? "text-green-500 " : "text-white hover:text-green-400 opacity-0"
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

function calcSecs(secs:number){
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    // Asegurarse de que los segundos siempre tengan dos dígitos
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }