"use client"; // This is a client component 👈🏽
import { useState, useCallback } from "react";
import { Album } from "./../../Interfaces/AlbumInterface";
import { AddAlbumIcon } from "./../Icons/AddAlbum";
import { RemoveAlbumIcon } from "./../../components/Icons/RemoveAlbum";

export function AlbumCard({
  album,
  onAddLikedAlbum,
}: {
  album: Album;
  onAddLikedAlbum: Function;
}) {
  // Estado para controlar si el mouse está sobre el componente
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedLikeAlbum, setIsAddedLikeAlbum] = useState(false);

  // Utiliza useCallback para memorizar las funciones y evitar re-creaciones innecesarias
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  const hoverClass = `${
    isHovered
      ? " block transition delay-150 duration-300 ease-in-out scale-110"
      : "opacity-0"
  }`;

  const addAlbumClick = () => {
    setIsAddedLikeAlbum(true);
    onAddLikedAlbum(album);
  };
  const removeAlbumClick = () => {
    setIsAddedLikeAlbum(false);
  };
  return (
    <div
      key={album.id}
      className="rounded bg-principal flex flex-col gap-4 p-4"
    >
      <div
        className="rounded relative w-full pb-bottom-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="rounded w-full absolute"
          src={album.image}
          alt="photo of band"
        />
        {!isAddedLikeAlbum ? (
          <AddAlbumIcon
            key={"addAlbum-" + album.id}
            className={
              "absolute bottom-3 right-3 rounded-full p-2 bg-like text-principal cursor-pointer stroke-2  " +
              hoverClass
            }
            width={"30"}
            height={"30"}
            addOrRemoveAlbumLike={addAlbumClick}
          />
        ) : (
          <RemoveAlbumIcon
            key={"addAlbum-" + album.id}
            className={
              " block transition delay-150 duration-300 ease-in-out scale-110 absolute bottom-3 right-3 rounded-full p-2 bg-liked text-like cursor-pointer stroke-2  "
            }
            width={"30"}
            height={"30"}
            addOrRemoveAlbumLike={removeAlbumClick}
          />
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden ">
          {album.name}
        </h3>
        <span>
          {album.artist.map(function(artist,index){
            return artist.name+" ";
          })}
        </span>
      </div>
    </div>
  );
}
