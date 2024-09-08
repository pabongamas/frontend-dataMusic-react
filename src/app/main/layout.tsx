import { LikedAlbumsProvider } from "../Hooks/LikedAlbumsContext";
import NavBar from "../components/navbar/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LikedAlbumsProvider>
      <main className="min-h-screen ">
        <NavBar />
        {children}
      </main>
    </LikedAlbumsProvider>
  );
}