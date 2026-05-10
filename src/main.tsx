import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { SkyThemeProvider } from "@/contexts/SkyThemeContext.tsx";

const App = lazy(() => import("./App.tsx"));
const NotFound = lazy(() => import("./NotFound.tsx"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// biome-ignore lint: vite scaffold
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkyThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SkyThemeProvider>
  </StrictMode>,
);
