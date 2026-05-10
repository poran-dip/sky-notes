import { createContext, type ReactNode, useEffect, useState } from "react";

export type SkyTheme =
  | "golden-sunrise"
  | "bright-morning"
  | "cloudy-noon"
  | "golden-hour"
  | "blue-hour"
  | "starlit-night"
  | "milky-way-night"
  | "astronomical-dawn";

interface SkyThemeVars {
  "--sky-text": string;
  "--sky-text-muted": string;
  "--sky-border": string;
  "--sky-card-bg": string;
  "--sky-card-footer": string;
  "--sky-dropdown-bg": string;
  "--sky-dropdown-hover": string;
  "--sky-placeholder": string;
  "--sky-danger": string;
  "--sky-danger-hover": string;
  "--sky-button-bg": string;
  "--sky-button-text": string;
  "--sky-button-shadow": string;
}

interface SkyThemeSlot {
  theme: SkyTheme;
  label: string;
  startHour: number;
  endHour: number;
  gradient: string;
  vars: SkyThemeVars;
}

const SKY_SLOTS: SkyThemeSlot[] = [
  {
    theme: "milky-way-night",
    label: "Milky Way Night",
    startHour: 0,
    endHour: 3,
    gradient: "linear-gradient(to bottom, #03040a, #0a0b1a, #120b2a)",
    vars: {
      "--sky-text": "#e5e7eb",
      "--sky-text-muted": "#a5b4fc",
      "--sky-border": "rgba(167,139,250,0.18)",
      "--sky-card-bg": "rgba(18, 10, 42, 0.45)",
      "--sky-card-footer": "rgba(18, 10, 42, 0.65)",
      "--sky-dropdown-bg": "#0f0b1f",
      "--sky-dropdown-hover": "#1a1233",
      "--sky-placeholder": "rgba(165,180,252,0.45)",
      "--sky-danger": "#f87171",
      "--sky-danger-hover": "#2a1428",
      "--sky-button-bg": "#1a1233",
      "--sky-button-text": "#e5e7eb",
      "--sky-button-shadow": "rgba(0,0,0,0.55)",
    },
  },
  {
    theme: "astronomical-dawn",
    label: "Astronomical Dawn",
    startHour: 3,
    endHour: 6,
    gradient: "linear-gradient(to bottom, #0b1026, #101a3a, #14224a)",
    vars: {
      "--sky-text": "#dbeafe",
      "--sky-text-muted": "#93c5fd",
      "--sky-border": "rgba(147,197,253,0.18)",
      "--sky-card-bg": "rgba(16, 26, 58, 0.45)",
      "--sky-card-footer": "rgba(16, 26, 58, 0.65)",
      "--sky-dropdown-bg": "#0f1a33",
      "--sky-dropdown-hover": "#14224a",
      "--sky-placeholder": "rgba(147,197,253,0.35)",
      "--sky-danger": "#f87171",
      "--sky-danger-hover": "#2b1a2a",
      "--sky-button-bg": "#14224a",
      "--sky-button-text": "#dbeafe",
      "--sky-button-shadow": "rgba(0,0,0,0.4)",
    },
  },
  {
    theme: "golden-sunrise",
    label: "Golden Sunrise",
    startHour: 6,
    endHour: 9,
    gradient: "linear-gradient(to bottom, #f97316, #fb923c, #fde68a)",
    vars: {
      "--sky-text": "#7c2d12",
      "--sky-text-muted": "#9a3412",
      "--sky-border": "rgba(124,45,18,0.2)",
      "--sky-card-bg": "rgba(255,237,213,0.35)",
      "--sky-card-footer": "rgba(255,237,213,0.6)",
      "--sky-dropdown-bg": "#fff7ed",
      "--sky-dropdown-hover": "#ffedd5",
      "--sky-placeholder": "rgba(154,52,18,0.4)",
      "--sky-danger": "#dc2626",
      "--sky-danger-hover": "#fef2f2",
      "--sky-button-bg": "#7c2d12",
      "--sky-button-text": "#fff7ed",
      "--sky-button-shadow": "rgba(124,45,18,0.3)",
    },
  },
  {
    theme: "bright-morning",
    label: "Bright Morning",
    startHour: 9,
    endHour: 12,
    gradient: "linear-gradient(to bottom, #38bdf8, #7dd3fc, #e0f2fe)",
    vars: {
      "--sky-text": "#0c4a6e",
      "--sky-text-muted": "#075985",
      "--sky-border": "rgba(12,74,110,0.2)",
      "--sky-card-bg": "rgba(224,242,254,0.35)",
      "--sky-card-footer": "rgba(224,242,254,0.6)",
      "--sky-dropdown-bg": "#f0f9ff",
      "--sky-dropdown-hover": "#e0f2fe",
      "--sky-placeholder": "rgba(7,89,133,0.4)",
      "--sky-danger": "#dc2626",
      "--sky-danger-hover": "#fef2f2",
      "--sky-button-bg": "#0c4a6e",
      "--sky-button-text": "#f0f9ff",
      "--sky-button-shadow": "rgba(12,74,110,0.3)",
    },
  },
  {
    theme: "cloudy-noon",
    label: "Cloudy Noon",
    startHour: 12,
    endHour: 15,
    gradient: "linear-gradient(to bottom, #94a3b8, #cbd5e1, #f1f5f9)",
    vars: {
      "--sky-text": "#1e3a8a",
      "--sky-text-muted": "#3b5b8a",
      "--sky-border": "rgba(30,58,138,0.15)",
      "--sky-card-bg": "rgba(241,245,249,0.42)",
      "--sky-card-footer": "rgba(241,245,249,0.65)",
      "--sky-dropdown-bg": "#f8fafc",
      "--sky-dropdown-hover": "#eef2f7",
      "--sky-placeholder": "rgba(59,91,138,0.4)",
      "--sky-danger": "#dc2626",
      "--sky-danger-hover": "#fef2f2",
      "--sky-button-bg": "#1e3a8a",
      "--sky-button-text": "#f8fafc",
      "--sky-button-shadow": "rgba(30,58,138,0.25)",
    },
  },
  {
    theme: "golden-hour",
    label: "Golden Hour",
    startHour: 15,
    endHour: 18,
    gradient: "linear-gradient(to bottom, #ea580c, #f59e0b, #fcd34d)",
    vars: {
      "--sky-text": "#4a2a12",
      "--sky-text-muted": "#6b3b16",
      "--sky-border": "rgba(74,42,18,0.16)",
      "--sky-card-bg": "rgba(255,248,220,0.48)",
      "--sky-card-footer": "rgba(255,248,220,0.72)",
      "--sky-dropdown-bg": "#fff7e6",
      "--sky-dropdown-hover": "#ffefc7",
      "--sky-placeholder": "rgba(107,59,22,0.38)",
      "--sky-danger": "#dc2626",
      "--sky-danger-hover": "#fff1f2",
      "--sky-button-bg": "#5b3418",
      "--sky-button-text": "#fffaf0",
      "--sky-button-shadow": "rgba(91,52,24,0.28)",
    },
  },
  {
    theme: "blue-hour",
    label: "Blue Hour",
    startHour: 18,
    endHour: 21,
    gradient: "linear-gradient(to bottom, #1e3a5f, #2563eb, #93c5fd)",
    vars: {
      "--sky-text": "#dbeafe",
      "--sky-text-muted": "#bfdbfe",
      "--sky-border": "rgba(219,234,254,0.2)",
      "--sky-card-bg": "rgba(30,58,95,0.4)",
      "--sky-card-footer": "rgba(30,58,95,0.65)",
      "--sky-dropdown-bg": "#1e3a5f",
      "--sky-dropdown-hover": "#1e40af",
      "--sky-placeholder": "rgba(191,219,254,0.45)",
      "--sky-danger": "#fca5a5",
      "--sky-danger-hover": "#3b1a1a",
      "--sky-button-bg": "#dbeafe",
      "--sky-button-text": "#1e3a5f",
      "--sky-button-shadow": "rgba(0,0,0,0.3)",
    },
  },
  {
    theme: "starlit-night",
    label: "Starlit Night",
    startHour: 21,
    endHour: 24,
    gradient: "linear-gradient(to bottom, #020617, #0b1224, #172554)",
    vars: {
      "--sky-text": "#f1f5f9",
      "--sky-text-muted": "#cbd5e1",
      "--sky-border": "rgba(241,245,249,0.18)",
      "--sky-card-bg": "rgba(18, 28, 52, 0.5)",
      "--sky-card-footer": "rgba(22, 34, 62, 0.76)",
      "--sky-dropdown-bg": "#111c36",
      "--sky-dropdown-hover": "#1b2a4d",
      "--sky-placeholder": "rgba(203,213,225,0.5)",
      "--sky-danger": "#f87171",
      "--sky-danger-hover": "#22161d",
      "--sky-button-bg": "#22356b",
      "--sky-button-text": "#f8fafc",
      "--sky-button-shadow": "rgba(0,0,0,0.45)",
    },
  },
];

function getSlotForHour(hour: number): SkyThemeSlot {
  return (
    SKY_SLOTS.find((s) => hour >= s.startHour && hour < s.endHour) ??
    SKY_SLOTS[0]
  );
}

function getImagePath(theme: SkyTheme): ImagePath {
  const index = SKY_SLOTS.findIndex((s) => s.theme === theme) + 1;

  return {
    jpeg: `/sky-images/${index}-${theme}.jpg`,
    webp: `/sky-images/${index}-${theme}.webp`,
  };
}

interface ImagePath {
  jpeg: string;
  webp: string;
}

export interface SkyThemeContextValue {
  current: SkyThemeSlot;
  imagePath: ImagePath;
  gradient: string;
  vars: SkyThemeVars;
}

export const SkyThemeContext = createContext<SkyThemeContextValue | null>(null);

export function SkyThemeProvider({ children }: { children: ReactNode }) {
  const [slot, setSlot] = useState<SkyThemeSlot>(() =>
    getSlotForHour(new Date().getHours()),
  );

  useEffect(() => {
    const tick = () => {
      const next = getSlotForHour(new Date().getHours());
      setSlot((prev) => (prev.theme === next.theme ? prev : next));
    };
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    for (const [key, value] of Object.entries(slot.vars)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [slot]);

  return (
    <SkyThemeContext.Provider
      value={{
        current: slot,
        imagePath: getImagePath(slot.theme),
        gradient: slot.gradient,
        vars: slot.vars,
      }}
    >
      {children}
    </SkyThemeContext.Provider>
  );
}
