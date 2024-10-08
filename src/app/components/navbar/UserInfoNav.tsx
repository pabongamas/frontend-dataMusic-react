"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface UserData {
  name: string;
  email: string;
  avatarUrl: string;
}

const UserInfoNav = () => {
    const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "john@example.com",
    avatarUrl:
      "https://scontent.fvga9-1.fna.fbcdn.net/v/t39.30808-1/341148320_896113984793070_6619657401408288249_n.jpg?stp=cp0_dst-jpg_s50x50&_nc_cat=109&ccb=1-7&_nc_sid=6738e8&_nc_ohc=x-C_rCy4DLYQ7kNvgG1Rqef&_nc_ht=scontent.fvga9-1.fna&edm=AP4hL3IEAAAA&_nc_gid=AfbhGWSYDTi1yoMhf9SCo6s&oh=00_AYAHEE2DuHsvjjAB_GVRC86Lft1qXT2PbAuh5kL-JD6irA&oe=67070A74",
  });
  const handleLogout = () => {
    // Implement logout logic here
    Cookies.remove('jwtTokenDataMusic');
    toast.success("You have successfully signed out");
    router.push('/auth/login');
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none bg-principal-600 p-1 rounded-full"
      >
          <Image
            src={userData.avatarUrl}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        {/* <span className="hidden md:inline">{userData.name}</span> */}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-principal-600 rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 text-sm border-b border-rowListH">
            <p className="font-semibold text-white">{userData.name}</p>
            <p className="text-xs">{userData.email}</p>
          </div>
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-rowListH"
          >
            <User className="inline-block mr-2 h-4 w-4" />
            Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm hover:bg-rowListH"
          >
            <Settings className="inline-block mr-2 h-4 w-4" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-rowListH"
          >
            <LogOut className="inline-block mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfoNav;
