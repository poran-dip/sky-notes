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
        onClick={() => setOpen((o) => !o)}
        className="h-6 md:h-8 flex items-center gap-1 rounded-2xl border-2 border-blue-100/70 px-2 md:px-3 text-white/70 hover:bg-white/20 transition-colors text-xs font-bold cursor-pointer"
      >
        Sort
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 w-40 bg-blue-100 rounded-xl shadow-lg border border-blue-100 flex flex-col overflow-hidden">
          <button
            type="button"
            key={"newest"}
            onClick={() => {
              onSortKeyChange("newest");
              setOpen(false);
            }}
            className={`px-3 py-2 font-bold text-xs text-left transition-colors cursor-pointer
                ${sortKey === "newest" ? "text-blue-800 bg-blue-50" : "text-blue-600 hover:bg-blue-50"}`}
          >
            Newest
          </button>
          <button
            type="button"
            key={"oldest"}
            onClick={() => {
              onSortKeyChange("oldest");
              setOpen(false);
            }}
            className={`px-3 py-2 font-bold text-xs text-left transition-colors cursor-pointer
                ${sortKey === "oldest" ? "text-blue-800 bg-blue-50" : "text-blue-600 hover:bg-blue-50"}`}
          >
            Oldest
          </button>
        </div>
      )}
    </div>
  );
};

export default SortControls;
