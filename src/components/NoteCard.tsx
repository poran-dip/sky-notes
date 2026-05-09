import { MoreHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useBeforeUnload } from "react-router";
import type { Note } from "@/types/notes";
import { timeAgo } from "@/utils/format";

interface NoteCardProps {
  note: Note;
  onUpdate: (updated: Note) => void;
  onDelete: (id: string) => void;
  onDuplicate: () => void;
  isMenuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}

const NoteCard = ({
  note,
  onUpdate,
  onDelete,
  onDuplicate,
  isMenuOpen,
  onMenuClose,
  onMenuOpen,
}: NoteCardProps) => {
  const [title, setTitle] = useState<string>(note.title ?? "");
  const [content, setContent] = useState<string>(note.content ?? "");
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date(note.updatedAt));
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(
    null,
  );

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const hasChanges = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuButtonRef.current?.contains(e.target as Node)) return;
      if (!menuRef.current?.contains(e.target as Node)) onMenuClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen, onMenuClose]);

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
          id={`${note.id}-title`}
          ref={titleRef}
          value={title}
          placeholder="Title"
          spellCheck={false}
          onChange={(e) => {
            setTitle(e.target.value);
            hasChanges.current = true;
          }}
          onBlur={save}
          onInput={(e) => autosize(e.currentTarget)}
          className="shrink-0 w-full resize-none overflow-hidden bg-transparent outline-none font-black text-base sm:text-lg text-blue-600 placeholder:text-blue-300"
        />

        <textarea
          id={`${note.id}-content`}
          ref={contentRef}
          value={content}
          placeholder="Content"
          spellCheck={false}
          onChange={(e) => {
            setContent(e.target.value);
            hasChanges.current = true;
          }}
          onBlur={save}
          onInput={(e) => autosize(e.currentTarget)}
          className="shrink-0 w-full resize-none overflow-hidden bg-transparent outline-none text-xs md:text-sm text-blue-900/80 placeholder:text-blue-300"
        />
      </div>

      <div className="shrink-0 w-full px-2 py-1 flex items-center justify-between gap-2 bg-blue-50/80 rounded-b-2xl">
        <p className="text-xs md:text-sm text-blue-900/80">
          {timeAgo(updatedAt)}
        </p>

        <div className="relative">
          <button
            type="button"
            ref={menuButtonRef}
            aria-label="Note options"
            onClick={() => {
              if (isMenuOpen) {
                onMenuClose();
              } else {
                const rect = menuButtonRef.current?.getBoundingClientRect();
                if (rect) {
                  const spaceBelow = window.innerHeight - rect.bottom;
                  setMenuPos(
                    spaceBelow < 150
                      ? {
                          top: rect.top - 150,
                          right: window.innerWidth - rect.right,
                        }
                      : {
                          top: rect.bottom + 8,
                          right: window.innerWidth - rect.right,
                        },
                  );
                }
                onMenuOpen();
              }
            }}
            className="text-blue-400 hover:text-blue-600 transition-colors cursor-pointer p-1"
          >
            <MoreHorizontal size={16} />
          </button>

          {isMenuOpen &&
            menuPos &&
            createPortal(
              <div
                ref={menuRef}
                style={{ top: menuPos.top, right: menuPos.right }}
                className="fixed right-0 mb-1 w-36 bg-blue-100 rounded-xl shadow-lg border border-blue-100 flex flex-col overflow-hidden z-20"
              >
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`${title}\n${content}`);
                    onMenuClose();
                  }}
                  className="px-3 py-2 font-bold text-xs text-left text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  Copy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.share?.({ title, text: content });
                    onMenuClose();
                  }}
                  className="px-3 py-2 font-bold text-xs text-left text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  Share
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDuplicate();
                    onMenuClose();
                  }}
                  className="px-3 py-2 font-bold text-xs text-left text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(note.id);
                    onMenuClose();
                  }}
                  className="px-3 py-2 font-bold text-xs text-left text-red-400 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>,
              document.body,
            )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
