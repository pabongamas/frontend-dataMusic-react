import Image from "next/image";
import { Album } from "./../../Interfaces/AlbumInterface";
import { AlbumCard } from "./AlbumCard";
import { ResponseData } from "./../../Interfaces/Response/Response";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { Pagination } from "../../components/utilities/pagination";
// import {useLocalStorage} from "./../../useStateFunctions/UseLocalStorage";

const albumList = (pageForApi:number) => {
  const [responseData, setResponseData] = useState<ResponseData>({});
  // const [likedAlbums, saveLikedAlbums] = useLocalStorage('LIKED_ALBUMS',[]);

  const jwtToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWFpbHNpdG9AZ21haWwuY29tIiwiaXNzIjoiZGF0YU11c2ljIiwiZXhwIjoxNzI2NDY5NzA5LCJpYXQiOjE3MjUxNzM3MDl9.ixZo0lZPF8CQgcCr9L-C1QFln2nF_xT_oGfQtr0ToEE";
  // Configuración de Axios con el JWT en la cabecera
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:8090/datamusic/api/albums/?page="+pageForApi+"&elements=10",
        axiosConfig
      )
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return responseData;
};

export default function ({
  onAddLikedAlbum,
  onRemoveLikedAlbum,
  pageForApi,
  likedAlbumsStorage
}: {
  onAddLikedAlbum: Function;
  onRemoveLikedAlbum: Function;
  pageForApi:number,
  likedAlbumsStorage:Album[]
}) {
  const responseData = albumList(pageForApi);
  const paginationData = () => {
    if (responseData.data?.albums !== undefined) {
      return (
        <div className="flex-col items-center justify-center grid pb-5">
          <Pagination
            totalElements={responseData.data.totalElements}
            pageable={responseData.data.pageable}
            elementsByPage={responseData.data.elementsByPage}
            totalPages={responseData.data.totalPages}
            url="/main"
            pageForApi={pageForApi}
          ></Pagination>
        </div>
      );
    }
  };
  return (
    <>
      <div className="flex-col items-center justify-between grid mobil:grid-cols-[repeat(1,minmax(0,1fr))] grid-cols-[repeat(2,minmax(0,1fr))]  sm:grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(5,minmax(0,1fr))] gap-3 p-12 sm:p-24 ">
        {responseData.data?.albums.map(function (album: Album) {
          return (
            <div className="" key={"divAlbumCard_" + album.albumId}>
              <AlbumCard
                onAddLikedAlbum={onAddLikedAlbum}
                onRemoveLikedAlbum={onRemoveLikedAlbum}
                key={album.albumId}
                album={album}
                isAlreadyLiked={(likedAlbumsStorage.filter(albumLiked=>albumLiked.albumId===album.albumId).length>0)}
              />
            </div>
          );
        })}
      </div>
      {paginationData()}
    </>
  );
}


function Loading() {
  return <h1>🌀 Loading...</h1>;
}