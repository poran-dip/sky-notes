import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { useSkyTheme } from "@/hooks/useSkyTheme";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { imagePath, gradient } = useSkyTheme();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:rounded-xl focus:font-bold focus:text-sm"
      >
        Skip to content
      </a>

      <div
        className="absolute inset-0 -z-20"
        style={{ background: gradient }}
      />

      <picture>
        <source srcSet={imagePath.webp} type="image/webp" />

        <img
          key={imagePath.webp}
          src={imagePath.jpeg}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-bottom animate-sky-fade-in pointer-events-none -z-10"
        />
      </picture>

      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
