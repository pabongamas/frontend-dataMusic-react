"use client"; // This is a client component 👈🏽
import { useSearchParams } from "next/navigation";
import { useLikedAlbumsContext } from "../Hooks/LikedAlbumsContext";
import ListAlbum from "../components/albums/ListAlbum";
import { Suspense } from "react";
import Loading from "./loading";

function ListAlbums() {
  const { likedAlbums, addLikedAlbum, removeLikedAlbum } = useLikedAlbumsContext();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const currentPage = page ? parseInt(page, 10) : 1;
  const pageForApi = currentPage - 1;

  return (
      <ListAlbum
      onAddLikedAlbum={addLikedAlbum}
      onRemoveLikedAlbum={removeLikedAlbum}
      pageForApi={pageForApi}
      likedAlbumsStorage={likedAlbums}
    />
  );
}

export default ListAlbums;