import { useCallback, useEffect, useRef, useState } from "react";
import { useBeforeUnload } from "react-router";
import type { Note } from "@/types/notes";
import { timeAgo } from "@/utils/format";

interface NoteCardProps {
  note: Note;
  onUpdate: (updated: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard = ({ note, onUpdate, onDelete }: NoteCardProps) => {
  const [title, setTitle] = useState(note.title ?? "");
  const [content, setContent] = useState<string>(note.content ?? "");
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date(note.updatedAt));

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const hasChanges = useRef(false);

  const save = useCallback(() => {
    if (!hasChanges.current) return;
    const now = new Date();
    setUpdatedAt(now);
    onUpdate({ ...note, title, content, updatedAt: now.toISOString() });
    hasChanges.current = false;
  }, [note, title, content, onUpdate]);

  const autosize = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    autosize(titleRef.current);
    autosize(contentRef.current);
  }, [autosize]);

  useEffect(() => {
    const interval = setInterval(save, 10000);
    return () => clearInterval(interval);
  }, [save]);

  useBeforeUnload(
    useCallback(() => {
      save();
    }, [save]),
  );

  return (
    <div className="relative z-10 flex flex-col justify-between border border-blue-100/80 bg-linear-to-r from-blue-50/20 to-blue-100/20 shadow-lg shadow-blue-900/20 rounded-2xl hover:-translate-y-1 transition-all duration-200">
      <div className="p-1 md:p-2 flex flex-col gap-1">
        <textarea
          ref={titleRef}
          value={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
            hasChanges.current = true;
          }}
          onBlur={save}
          onInput={(e) => autosize(e.currentTarget)}
          className="shrink-0 w-full resize-none overflow-hidden bg-transparent outline-none font-black text-base sm:text-lg text-blue-600 placeholder:text-blue-300"
        />

        <textarea
          ref={contentRef}
          value={content}
          placeholder="Content"
          onChange={(e) => {
            setContent(e.target.value);
            hasChanges.current = true;
          }}
          onBlur={save}
          onInput={(e) => autosize(e.currentTarget)}
          className="shrink-0 w-full resize-none overflow-hidden bg-transparent outline-none text-xs md:text-sm text-blue-900/80 placeholder:text-blue-300"
        />
      </div>

      <div className="shrink-0 w-full px-2 py-1 flex items-center justify-end gap-2 bg-blue-50/80 rounded-b-2xl">
        <button
          type="button"
          onClick={() => onDelete(note.id)}
          className="text-xs md:text-sm text-red-400 hover:text-red-600 transition-colors cursor-pointer"
        >
          Delete
        </button>
        <p className="text-xs md:text-sm text-blue-900/80">
          {timeAgo(updatedAt)}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
