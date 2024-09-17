"use client"; // This is a client component 👈🏽
import { Album } from "@/app/Interfaces/AlbumInterface";
import { AddAlbumProps } from "@/app/Interfaces/AddAlbumProps";
import { useState } from "react";
import { useLikedAlbumsContext } from "../../Hooks/LikedAlbumsContext";



function AddAlbumIcon({ className, width, height,addOrRemoveAlbumLike }: AddAlbumProps) {
  return (
    <>
      <div title="Add to liked Songs" className={className ? " " + className : ""}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={
            "icon icon-tabler icons-tabler-outline icon-tabler-heart-plus"
          }
          onClick={addOrRemoveAlbumLike}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
          <path d="M16 19h6" />
          <path d="M19 16v6" />
        </svg>
      </div>
    </>
  );
}

function LikedAlbums({ className, width, height, showText }: AddAlbumProps) {
  const countLikedAlbums = () => {
    const {likedAlbums}=useLikedAlbumsContext();
    return <span className="">{likedAlbums?.length}</span>;
  };
  return (
    <>
      <div className={className ? " " + className : ""}>
      {showText ? countLikedAlbums() : null}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={
            "icon icon-tabler icons-tabler-outline icon-tabler-heart-plus"
          }
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
          <path d="M16 19h6" />
          <path d="M19 16v6" />
        </svg>
      </div>
    </>
  );
}
export { AddAlbumIcon, LikedAlbums };
