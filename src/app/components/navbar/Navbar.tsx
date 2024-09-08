import { Album } from "@/app/Interfaces/AlbumInterface";
import { LikedAlbums } from "../Icons/AddAlbum";
// import {useLocalStorage} from "../../useStateFunctions/UseLocalStorage"
// const [likedAlbums, saveLikedAlbums] = useLocalStorage('LIKED_ALBUMS',[]);
 function NavBar() {
  return (
    <header className="w-full h-16 sticky top-0 flex  items-center z-10 bg-principal">
      <nav className="w-full p-4 flex">
        <h1 className="flex-1">Data Music</h1>
        <div className="flex gap-1">
          <span>Liked Albums</span>
          <LikedAlbums
            className="flex text-like cursor-pointer stroke-2"
            width="30"
            height="30"
            showText={true}
            // likedAlbums={likedAlbums}
          />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;