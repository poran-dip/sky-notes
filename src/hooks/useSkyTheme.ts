import { useContext } from "react";
import {
  SkyThemeContext,
  type SkyThemeContextValue,
} from "@/contexts/SkyThemeContext";

export function useSkyTheme(): SkyThemeContextValue {
  const ctx = useContext(SkyThemeContext);
  if (!ctx) throw new Error("useSkyTheme must be used within SkyThemeProvider");
  return ctx;
}
