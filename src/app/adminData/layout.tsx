
import NavBar from "../components/navbar/Navbar";

export default function DashboardLayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
      <main className="min-h-screen ">
        <NavBar isAdmin={true} />
        {children}
      </main>
  );
}