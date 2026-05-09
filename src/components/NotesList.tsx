import { useEffect, useState } from "react";
import type { Note } from "@/types/notes";
import NoteCard from "./NoteCard";
import NotesListHeader from "./NotesListHeader";
import type { SortKey } from "./SortControls";
import Button from "./ui/Button";

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [, tick] = useState(0);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>(() => {
    return (localStorage.getItem("sky-notes-sort-key") as SortKey) ?? "newest";
  });

  const handleSortKeyChange = (key: SortKey) => {
    setSortKey(key);
    localStorage.setItem("sky-notes-sort-key", key);
  };

  const addNote = (title?: string, content?: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => {
      const next = [newNote, ...prev];
      localStorage.setItem("sky-notes", JSON.stringify(next));
      return next;
    });
  };

  const updateNote = (updated: Note) => {
    setNotes((prev) => {
      const next = prev.map((n) => (n.id === updated.id ? updated : n));
      localStorage.setItem("sky-notes", JSON.stringify(next));
      return next;
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      localStorage.setItem("sky-notes", JSON.stringify(next));
      return next;
    });
  };

  const sortedNotes = sortKey === "oldest" ? [...notes].reverse() : notes;

  const filteredNotes =
    searchTerm === ""
      ? sortedNotes
      : sortedNotes.filter(
          (n) =>
            n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            n.content?.toLowerCase().includes(searchTerm.toLowerCase()),
        );

  useEffect(() => {
    const storedNotes = localStorage.getItem("sky-notes");

    if (storedNotes) {
      setNotes(JSON.parse(storedNotes) as Note[]);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => tick((n) => n + 1), 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen px-2 sm:px-8 md:px-10 lg:px-16 pt-14 sm:pt-18 md:pt-24 pb-2 sm:pb-4 md:pb-8">
      <div className="bg-sky-card-bg shadow-lg shadow-black/30 h-full w-full rounded-2xl sm:rounded-3xl md:rounded-4xl flex flex-col overflow-hidden">
        <NotesListHeader
          addNote={addNote}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortKey={sortKey}
          onSortKeyChange={handleSortKeyChange}
        />
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col gap-4 p-4">
          {searchTerm && filteredNotes.length === 0 ? (
            <div className="relative z-5 flex-1 flex items-center justify-center text-center">
              <p className="text-lg font-bold text-sky-text-muted">
                No notes found for "{searchTerm}"
              </p>
            </div>
          ) : notes.length === 0 ? (
            <div className="relative z-5 flex-1 flex flex-col items-center justify-center gap-3 text-center">
              <p className="text-lg font-bold text-sky-text-muted">
                No notes yet
              </p>
              <Button onClick={() => addNote("", "")}>New</Button>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onUpdate={updateNote}
                onDelete={deleteNote}
                onDuplicate={() => addNote(note.title, note.content)}
                isMenuOpen={openMenuId === note.id}
                onMenuOpen={() => setOpenMenuId(note.id)}
                onMenuClose={() => setOpenMenuId(null)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesList;
