"use client"; // This is a client component 👈🏽
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import notFound from "../../../../public/img/notFound.png";
import { RemoveAlbumIcon } from "./../../components/Icons/RemoveAlbum";
import { Album } from "./../../Interfaces/AlbumInterface";
import { AddAlbumIcon } from "./../Icons/AddAlbum";
import { NOTFOUND } from "dns";
import { Console } from "console";
import { usePathname } from 'next/navigation'

export function AlbumCard({
  album,
  onAddLikedAlbum,
  onRemoveLikedAlbum,
  isAlreadyLiked,
  isCard
}: {
  album: Album;
  onAddLikedAlbum: Function;
  onRemoveLikedAlbum: Function;
  isAlreadyLiked:boolean,
  isCard:boolean;
}) {
  const currentPath =usePathname();
 
  // Estado para controlar si el mouse está sobre el componente
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedLikeAlbum, setIsAddedLikeAlbum] = useState(false);

  // constants for the routes
  const URL_ALBUM_INFO = currentPath+"/AlbumInfo";
  const URL_ARTIST_INFO = currentPath+"/ArtistInfo/"

  //constants for strings
  const NOT_FOUND_ARTIST = "Not Found Artist";


  // Utiliza useCallback para memorizar las funciones y evitar re-creaciones innecesarias
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  const hoverClass = `${isHovered
      ? " block transition delay-150 duration-300 ease-in-out scale-110"
      : "opacity-0"
    }`;

  const addAlbumClick = () => {
    setIsAddedLikeAlbum(true);
    onAddLikedAlbum(album);
  };
  const removeAlbumClick = () => {
    setIsAddedLikeAlbum(false);
    onRemoveLikedAlbum(album);
  };
  const descriptionArtists = album.artists.map(function (artist, index) {
    if (index === album.artists.length - 1) {
      return <Link key={index} href={URL_ARTIST_INFO + artist.artist.artistId}><span className="hover:underline cursor-pointer text-sub" key={index}>{artist.artist.name}</span></Link>;
    } else {
      return (
        <React.Fragment key={index}>
          <Link key={index} href={URL_ARTIST_INFO + artist.artist.artistId}>
            <span key={index} className="hover:underline cursor-pointer text-sub">{artist.artist.name}, </span>
          </Link>
        </React.Fragment>
      );
    }

  });
  if(!isCard){
    return (
      <div
      className="rounded relative w-full pb-bottom-full  h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {album.imgAlbum !== undefined ? (
          <Image
            src={"data:image/png;base64," + album.imgAlbum}
            priority={true}
            alt={"photo by " + album.name + " by" + descriptionArtists}
            width={100}
            height={100}
            className="rounded w-full absolute  h-full"
          />
      ) : (
          <Image
            src={notFound}
            priority={true}
            alt={"photo by " + album.name + " by" + descriptionArtists}
            className="rounded w-full absolute"
          />
      )}
       {!isAddedLikeAlbum && !isAlreadyLiked ? (
          <AddAlbumIcon
            key={"addAlbum-" + album.albumId}
            className={
              "absolute bottom-3 right-3 rounded-full p-2 bg-like text-principal cursor-pointer stroke-2" +
              hoverClass
            }
            width={"30"}
            height={"30"}
            addOrRemoveAlbumLike={addAlbumClick}
          />
        ) : (
          <RemoveAlbumIcon
            key={"addAlbum-" + album.albumId}
            className={
              " block transition delay-150 duration-300 ease-in-out scale-110 absolute bottom-3 right-3 rounded-full p-2 bg-liked text-like cursor-pointer stroke-2 xd  "
            }
            width={"30"}
            height={"30"}
            addOrRemoveAlbumLike={removeAlbumClick}
          />
        )}
      </div>
    );
  }
  return (
    <div
      key={album.albumId}
      className="rounded bg-principal flex flex-col gap-4 p-4"
    >
      <div
        className="rounded relative w-full pb-bottom-full cursor-pointer h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {album.imgAlbum !== undefined ? (
          <Link href={`${URL_ALBUM_INFO}/${album.albumId}`}>
            <Image
              src={"data:image/png;base64," + album.imgAlbum}
              priority={true}
              alt={"photo by " + album.name + " by" + descriptionArtists}
              width={100}
              height={100}
              className="rounded w-full absolute  h-full"
            />
          </Link>
        ) : (
          <Link href={`${URL_ALBUM_INFO}/${album.albumId}`}>
            <Image
              src={notFound}
              priority={true}
              alt={"photo by " + album.name + " by" + descriptionArtists}
              className="rounded w-full absolute"
            />
          </Link>
        )}

        {!isAddedLikeAlbum && !isAlreadyLiked ? (
          <AddAlbumIcon
            key={"addAlbum-" + album.albumId}
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
            key={"addAlbum-" + album.albumId}
            className={
              " block transition delay-150 duration-300 ease-in-out scale-110 absolute bottom-3 right-3 rounded-full p-2 bg-liked text-like cursor-pointer stroke-2 xd  "
            }
            width={"30"}
            height={"30"}
            addOrRemoveAlbumLike={removeAlbumClick}
          />
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold whitespace-nowrap text-ellipsis overflow-hidden font">
          {album.name}
        </h3>
        <span key={album.albumId} className="gap-1 text-ellipsis overflow-hidden whitespace-nowrap w-full ">
          {album.artists.length > 0
            ? descriptionArtists
            : NOT_FOUND_ARTIST}
        </span>
      </div>
    </div>
  );
}
