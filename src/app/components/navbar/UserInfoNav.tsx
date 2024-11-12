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
      "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
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
            href="/main/profile"
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
