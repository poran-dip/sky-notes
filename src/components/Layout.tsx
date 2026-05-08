import type { ReactNode } from "react";
import Cloud from "@/assets/cloud1.png";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-blue-400 to-blue-50">
      <img
        alt="Sky Notebook cloud background"
        src={Cloud}
        className="absolute top-1/2 left-1/2 w-screen -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"
      />

      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
