import { useEffect, useState } from "react";
import type { Note } from "@/types/notes";
import NoteCard from "./NoteCard";
import NotesListHeader from "./NotesListHeader";

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addNote = () => {
    console.log("addNote called");
    const newNote: Note = {
      id: crypto.randomUUID(),
      type: "text",
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => {
      const next = [newNote, ...prev];
      localStorage.setItem("sky-notes", JSON.stringify(next));
      return next;
    });
    console.log(notes);
    console.log(filteredNotes);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      localStorage.setItem("sky-notes", JSON.stringify(next));
      return next;
    });
  };

  const filteredNotes =
    searchTerm === ""
      ? notes
      : notes.filter(
          (n) =>
            n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (typeof n.content === "string" &&
              n.content.toLowerCase().includes(searchTerm.toLowerCase())),
        );

  useEffect(() => {
    const storedNotes = localStorage.getItem("sky-notes");

    if (storedNotes) {
      setNotes(JSON.parse(storedNotes) as Note[]);
    }
  }, []);

  const updateNote = (updated: Note) => {
    setNotes((prev) => {
      const next = prev.map((n) => (n.id === updated.id ? updated : n));
      localStorage.setItem("sky-notes", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="h-screen px-2 sm:px-8 md:px-10 lg:px-16 pt-14 sm:pt-18 md:pt-24 pb-2 sm:pb-4 md:pb-8">
      <div className="bg-white/30 shadow-lg shadow-black/30 h-full w-full rounded-2xl sm:rounded-3xl md:rounded-4xl flex flex-col overflow-hidden">
        <NotesListHeader
          addNote={addNote}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col gap-4 p-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesList;
