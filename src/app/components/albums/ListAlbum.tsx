import Image from "next/image";
import { Album } from "./../../Interfaces/AlbumInterface";
import { AlbumCard } from "./AlbumCard";
import { ResponseData } from "./../../Interfaces/Response/Response";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { Pagination } from "../../components/utilities/pagination";
import Cookies from 'js-cookie';
import { useLikedAlbumsContext } from "@/app/Hooks/LikedAlbumsContext";

export default function ({
  pageForApi,
  dataResponse
}:{
  pageForApi: number;
  dataResponse:ResponseData
}){
  const paginationData = () => {
    if (dataResponse !== undefined) {
      return (
        <div className="flex-col items-center justify-center grid pb-5">
          <Pagination
            totalElements={dataResponse.data?.totalElements}
            pageable={dataResponse.data?.pageable}
            elementsByPage={dataResponse.data.elementsByPage}
            totalPages={dataResponse.data.totalPages}
            url="/main"
            pageForApi={pageForApi}
          ></Pagination>
        </div>
      );
    }};
  return (
    <>
      <div className="flex-col items-center justify-between grid mobil:grid-cols-[repeat(1,minmax(0,1fr))] grid-cols-[repeat(2,minmax(0,1fr))]  sm:grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(5,minmax(0,1fr))] gap-3 p-12 sm:p-24 ">
         {dataResponse.data?.albums.map(function (album: Album) {
          return (
            <div className="" key={"divAlbumCard_" + album.albumId}>
              {
              <AlbumCard
              isCard={true}
              key={album.albumId}
              album={album}
            />
              }
              
            </div>
          );
        })}
      </div>
    {paginationData()}
    </>
  )
}