// import { LikedAlbumsProvider } from "../Hooks/LikedAlbumsContext";
import { AudioPlayerProvider } from "../Hooks/usePlayerContext";
import AudioPlayer from "../components/audioPlayer/player";

import NavBar from "../components/navbar/Navbar";
import { ModeToggle } from "../components/theme/toogleTheme";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // <LikedAlbumsProvider>
      <main className="min-h-screen ">
      <AudioPlayerProvider>
        <NavBar isAdmin={false} />
        {children}
        <AudioPlayer />
      </AudioPlayerProvider>
      <div className="absolute bottom-2">
        <ModeToggle/>
      </div>
      </main>
    // </LikedAlbumsProvider>
  );
}