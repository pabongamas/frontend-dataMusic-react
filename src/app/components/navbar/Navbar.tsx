import { LikedAlbums } from "../Icons/AddAlbum";
import Link from "next/link";
import UserInfoNav from "./UserInfoNav";
// import {useLocalStorage} from "../../useStateFunctions/UseLocalStorage"
// const [likedAlbums, saveLikedAlbums] = useLocalStorage('LIKED_ALBUMS',[]);
function NavBar({ isAdmin = false }: { isAdmin: boolean }) {
  return (
    <header className="w-full h-16 sticky top-0 flex  items-center z-10 bg-principal-550">
      <nav className="w-full p-4 flex">
        <Link className="flex-1 flex items-center text-sub" href={"/"}>
          <h1>Data Music</h1>
        </Link>
        <div className="flex gap-2 items-center">
          {!isAdmin && ( // render only it's  isadmin false
            <div className="flex items-center gap-2">
              <span className="text-sub">Liked Albums</span>
              <LikedAlbums
                className="flex text-like cursor-pointer stroke-2 items-center "
                width="30"
                height="30"
                showText={true}
                // likedAlbums={likedAlbums}
              />
            </div>
          )}
          <div className="flex gap-1">
            <UserInfoNav />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
