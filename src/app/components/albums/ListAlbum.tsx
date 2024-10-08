// "use client";
import Image from "next/image";
import { Album } from "./../../Interfaces/AlbumInterface";
import { AlbumCard } from "./AlbumCard";
import { ResponseData } from "./../../Interfaces/Response/Response";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { Pagination } from "../../components/utilities/pagination";
import Cookies from 'js-cookie';
import { useLikedAlbumsContext } from "@/app/Hooks/LikedAlbumsContext";
// import {useLocalStorage} from "./../../useStateFunctions/UseLocalStorage";

// const albumList = (pageForApi: number) => {
//   const [responseData, setResponseData] = useState<ResponseData>({});
//   // const [likedAlbums, saveLikedAlbums] = useLocalStorage('LIKED_ALBUMS',[]);
//   const jwtToken = Cookies.get('jwtTokenDataMusic');
//   // Configuración de Axios con el JWT en la cabecera
//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
//       "Content-Type": "application/json",
//     },
//   };

//   useEffect(() => {
//     axios
//       .get(
//         "http://localhost:8090/datamusic/api/albums/?page=" +
//           pageForApi +
//           "&elements=10",
//         axiosConfig
//       )
//       .then((response) => {
//         setResponseData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
//   return responseData;
// };
export default function ({
  pageForApi,
  dataResponse
}:{
  pageForApi: number;
  dataResponse:ResponseData
}){
    // const { likedAlbums, addLikedAlbum, removeLikedAlbum } = useLikedAlbumsContext();
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
              {/* <AlbumCard
                isCard={true}
                onAddLikedAlbum={addLikedAlbum}
                onRemoveLikedAlbum={removeLikedAlbum}
                key={album.albumId}
                album={album}
                isAlreadyLiked={
                  likedAlbums.filter(
                    (albumLiked) => albumLiked.albumId === album.albumId
                  ).length > 0
                }
              /> */
              <AlbumCard
              isCard={true}
              // onAddLikedAlbum={addLikedAlbum}
              // onRemoveLikedAlbum={removeLikedAlbum}
              key={album.albumId}
              album={album}
              // isAlreadyLiked={
              //   likedAlbums.filter(
              //     (albumLiked) => albumLiked.albumId === album.albumId
              //   ).length > 0
              // }
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
// export default function ({
//   onAddLikedAlbum,
//   onRemoveLikedAlbum,
//   pageForApi,
//   likedAlbumsStorage,
// }: {
//   onAddLikedAlbum: Function;
//   onRemoveLikedAlbum: Function;
//   pageForApi: number;
//   likedAlbumsStorage: Album[];
// }) {
//   const responseData = albumList(pageForApi);
  // const paginationData = () => {
  //   if (albums !== undefined) {
  //     return (
  //       <div className="flex-col items-center justify-center grid pb-5">
  //         <Pagination
  //           totalElements={responseData.data.totalElements}
  //           pageable={responseData.data.pageable}
  //           elementsByPage={responseData.data.elementsByPage}
  //           totalPages={responseData.data.totalPages}
  //           url="/main"
  //           pageForApi={pageForApi}
  //         ></Pagination>
  //       </div>
  //     );
  //   }
//   };
//   return (
//     <>
//       <div className="flex-col items-center justify-between grid mobil:grid-cols-[repeat(1,minmax(0,1fr))] grid-cols-[repeat(2,minmax(0,1fr))]  sm:grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(5,minmax(0,1fr))] gap-3 p-12 sm:p-24 ">
//         {responseData.data?.albums.map(function (album: Album) {
//           return (
//             <div className="" key={"divAlbumCard_" + album.albumId}>
//               <AlbumCard
//                 isCard={true}
//                 onAddLikedAlbum={onAddLikedAlbum}
//                 onRemoveLikedAlbum={onRemoveLikedAlbum}
//                 key={album.albumId}
//                 album={album}
//                 isAlreadyLiked={
//                   likedAlbumsStorage.filter(
//                     (albumLiked) => albumLiked.albumId === album.albumId
//                   ).length > 0
//                 }
//               />
//             </div>
//           );
//         })}
//       </div>
//       {paginationData()}
//     </>
//   );
// }
