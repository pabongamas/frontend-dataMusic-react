"use client"; // This is a client component 👈🏽
import { Album } from "@/app/Interfaces/AlbumInterface";
import { AddAlbumProps } from "@/app/Interfaces/AddAlbumProps";
import { useState } from "react";


function RemoveAlbumIcon({ className, width, height,addOrRemoveAlbumLike}: AddAlbumProps) {
    return (
      <>
        <div className={className ? " " + className : ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={
              "icon icon-tabler icons-tabler-outline icon-tabler-check"
            }
            onClick={addOrRemoveAlbumLike}
          >
         <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" />
          </svg>
        </div>
      </>
    );
  }


  export {RemoveAlbumIcon };

