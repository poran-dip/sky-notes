import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type SortKey = "newest" | "oldest";

interface SortControlsProps {
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
}

const SortControls = ({ sortKey, onSortKeyChange }: SortControlsProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sort notes"
        onClick={() => setOpen((o) => !o)}
        className="h-6 md:h-8 flex items-center gap-1 rounded-2xl border-2 border-sky-border px-2 md:px-3 text-sky-text-muted hover:bg-sky-card-bg transition-colors text-xs font-bold cursor-pointer"
      >
        Sort
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Sort order"
          className="absolute right-0 top-full mt-1 z-20 w-40 bg-sky-dropdown-bg rounded-xl shadow-lg border border-sky-border flex flex-col overflow-hidden"
        >
          <button
            type="button"
            role="option"
            aria-selected={sortKey === "newest"}
            onClick={() => {
              onSortKeyChange("newest");
              setOpen(false);
            }}
            className={`px-3 py-2 font-bold text-xs text-left transition-colors cursor-pointer
                ${sortKey === "newest" ? "text-sky-text bg-sky-dropdown-hover" : "text-sky-text-muted hover:bg-sky-dropdown-hover"}`}
          >
            Newest
          </button>
          <button
            type="button"
            role="option"
            aria-selected={sortKey === "oldest"}
            onClick={() => {
              onSortKeyChange("oldest");
              setOpen(false);
            }}
            className={`px-3 py-2 font-bold text-xs text-left transition-colors cursor-pointer
                ${sortKey === "oldest" ? "text-sky-text bg-sky-dropdown-hover" : "text-sky-text-muted hover:bg-sky-dropdown-hover"}`}
          >
            Oldest
          </button>
        </div>
      )}
    </div>
  );
};

export default SortControls;
