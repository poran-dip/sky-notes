import type { ReactNode } from "react";
import Cloud from "@/assets/cloud1.png";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-blue-400 to-blue-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:rounded-xl focus:font-bold focus:text-sm"
      >
        Skip to content
      </a>
      <img
        alt=""
        src={Cloud}
        fetchPriority="high"
        className="absolute top-1/2 left-1/2 w-screen -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"
      />

      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
