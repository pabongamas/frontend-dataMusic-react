// import { LikedAlbumsProvider } from "../Hooks/LikedAlbumsContext";
import { AudioPlayerProvider } from "../Hooks/usePlayerContext";
import AudioPlayer from "../components/audioPlayer/player";

import NavBar from "../components/navbar/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // <LikedAlbumsProvider>
      <main className="min-h-screen ">
      <AudioPlayerProvider>
        <NavBar />
        {children}
        <AudioPlayer />
      </AudioPlayerProvider>
      </main>
    // </LikedAlbumsProvider>
  );
}