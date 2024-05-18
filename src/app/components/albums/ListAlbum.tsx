import Image from "next/image";
import { Album } from "./../../Interfaces/AlbumInterface";
import { AlbumCard } from "./AlbumCard";
import { ResponseData } from "./../../Interfaces/Response/Response";
import axios from "axios";
import { useEffect, useState } from "react";

const albumList = () => {
  const [responseData, setResponseData] = useState<ResponseData>({});

  const jwtToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWFpbHNpdG9AZ21haWwuY29tIiwiaXNzIjoiZGF0YU11c2ljIiwiZXhwIjoxNzE2NjQ1MjU1LCJpYXQiOjE3MTUzNDkyNTV9.yDAIyg7IYz5XTGwiIKW_cX02S2koc-pfLCbCus1XHUU";
  // Configuración de Axios con el JWT en la cabecera
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8090/datamusic/api/albums/?page=0&elements=50", axiosConfig)
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return responseData;
};

// const data: Album[] = [
//   {
//     id: "1",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4m6SACBoLTlFLvgzPOzCMQ3Fx6LvYiMg0dsb8di_VUg&s",
//     name: "From mars To Sirius",
//     artist: [
//       {
//         name: "Gojira",
//       },
//       {
//         name: "Iron Maiden",
//       },
//     ],
//   },
//   {
//     id: "2",
//     image: "https://i.scdn.co/image/ab67616d00001e026ac3ed972e1c181cd2ee8d55",
//     name: "Iron Maiden",
//     artist: [
//       {
//         name: "Iron Maiden",
//       },
//     ],
//   },
//   {
//     id: "3",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/e/e7/%22AM%22_%28Arctic_Monkeys%29.jpg",
//     name: "AM",
//     artist: [
//       {
//         name: "Artic Monkeys",
//       },
//     ],
//   },
//   {
//     id: "4",
//     image: "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
//     name: "The Adults Are Talking",
//     artist: [
//       {
//         name: "The Strokes",
//       },
//     ],
//   },
//   {
//     id: "5",
//     image: "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
//     name: "The Adults Are Talking",
//     artist: [
//       {
//         name: "The Strokes",
//       },
//     ],
//   },
//   {
//     id: "6",
//     image: "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
//     name: "The Adults Are Talking",
//     artist: [
//       {
//         name: "The Strokes",
//       },
//     ],
//   },
//   {
//     id: "7",
//     image: "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
//     name: "The Adults Are Talking",
//     artist: [
//       {
//         name: "The Strokes",
//       },
//     ],
//   },
//   {
//     id: "8",
//     image: "https://i.scdn.co/image/ab67616d00001e026ac3ed972e1c181cd2ee8d55",
//     name: "Iron Maiden",
//     artist: [
//       {
//         name: "Iron Maiden",
//       },
//     ],
//   },
//   {
//     id: "9",
//     image: "https://i.scdn.co/image/ab67616d00001e026ac3ed972e1c181cd2ee8d55",
//     name: "Iron Maiden",
//     artist: [
//       {
//         name: "Iron Maiden",
//       },
//     ],
//   },
//   {
//     id: "10",
//     image: "https://i.scdn.co/image/ab67616d00001e026ac3ed972e1c181cd2ee8d55",
//     name: "Iron Maiden",
//     artist: [
//       {
//         name: "Iron Maiden",
//       },
//     ],
//   },
// ];

export default function ({
  onAddLikedAlbum,
  onRemoveLikedAlbum,
}: {
  onAddLikedAlbum: Function;
  onRemoveLikedAlbum: Function;
}) {
  const responseData =albumList();
  console.log(responseData.data?.albums);
  return (
    <>
      <div className="flex-col items-center justify-between grid mobil:grid-cols-[repeat(1,minmax(0,1fr))] grid-cols-[repeat(2,minmax(0,1fr))]  sm:grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(5,minmax(0,1fr))] gap-3 p-12 sm:p-24 ">
        {responseData.data?.albums.map(function (album) {
          return (
            <div className="" key={"divAlbumCard_" + album.albumId}>
              <AlbumCard
                onAddLikedAlbum={onAddLikedAlbum}
                onRemoveLikedAlbum={onRemoveLikedAlbum}
                key={album.albumId}
                album={album}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
