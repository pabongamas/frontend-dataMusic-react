import ListAlbum from "../components/albums/ListAlbum";
import { Suspense } from "react";
import Loading from "./loading";
import { cookies } from 'next/headers';
import { ResponseData } from "../Interfaces/Response/Response";
import { Album } from "../Interfaces/AlbumInterface";


async function ListAlbums({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page =searchParams!==undefined? searchParams.page:1;
  const currentPage = page ? parseInt(handleParamsUrl(page), 10) : 1;
  const pageForApi = currentPage - 1;


  const cookieStore = cookies();
  const jwtToken = cookieStore.get('jwtTokenDataMusic')?.value;
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
      "Content-Type": "application/json",
    },
  };
  const resAlbum = await fetch(
    "http://localhost:8090/datamusic/api/albums/?page=" +
          pageForApi +
          "&elements=10",
    axiosConfig
  );
  let variableGetDataAlbums: ResponseData;
  if (resAlbum.ok) {
    const jsonDat: ResponseData = await resAlbum.json();
      variableGetDataAlbums = jsonDat;
  } else {
    throw new Error(`Error: ${resAlbum.status} ${resAlbum.statusText}`);
  }

  return (
    <ListAlbum pageForApi={pageForApi} dataResponse={variableGetDataAlbums}/>
  );
}
function handleParamsUrl(value: string | string[] | 1){
  let stringValue: string;

  if (Array.isArray(value)) {
    stringValue = value.join(','); // Convierte el array a un string separado por comas
  } else if (typeof value === 'number') {
    stringValue = value.toString(); // Convierte el número a string
  } else {
    stringValue = value; // Ya es un string
  }

  return stringValue;
}

export default ListAlbums;