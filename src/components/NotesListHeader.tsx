import { Search } from "lucide-react";
import SortControls, { type SortKey } from "./SortControls";
import Button from "./ui/Button";

interface NotesListHeaderProps {
  addNote: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
}

const NotesListHeader = ({
  addNote,
  searchTerm,
  onSearchChange,
  sortKey,
  onSortKeyChange,
}: NotesListHeaderProps) => {
  return (
    <header className="h-12 md:h-16 w-full px-5 md:px-8 flex items-center justify-between gap-2 border-b-2 border-sky-border">
      <div className="relative w-full max-w-60 sm:max-w-80 md:max-w-100">
        <Search className="absolute left-2 md:left-3 h-3 md:h-4 w-3 md:w-4 top-1/2 -translate-y-1/2 text-sky-text-muted pointer-events-none" />
        <input
          id="search"
          aria-label="Search notes"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-6 md:h-8 rounded-2xl border-2 pl-6 md:pl-8 pr-2 border-sky-border focus:border-sky-text-muted focus:outline-0 text-sky-text placeholder:text-sky-placeholder bg-transparent"
          placeholder="Search notes"
        />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <SortControls sortKey={sortKey} onSortKeyChange={onSortKeyChange} />
        <Button size="sm" onClick={() => addNote()}>
          New
        </Button>
      </div>
    </header>
  );
};

export default NotesListHeader;
