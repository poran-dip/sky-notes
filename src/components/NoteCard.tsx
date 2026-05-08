import { useCallback, useEffect, useRef, useState } from "react";
import type { Note, Todo } from "@/types/notes";
import { timeAgo } from "@/utils/format";

interface NoteCardProps {
  note: Note;
  onUpdate: (updated: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard = ({ note, onUpdate, onDelete }: NoteCardProps) => {
  const [title, setTitle] = useState(note.title ?? "");
  const [type, setType] = useState(note.type);
  const [text, setText] = useState(
    typeof note.content === "string" ? note.content : "",
  );
  const [todos, setTodos] = useState<Todo[]>(
    Array.isArray(note.content) ? note.content : [],
  );
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date(note.updatedAt));

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const todoRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const touch = useCallback(() => {
    const now = new Date();
    setUpdatedAt(now);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const updatedNote: Note =
        note.type === "text"
          ? { ...note, title, content: text, updatedAt: now.toISOString() }
          : { ...note, title, content: todos, updatedAt: now.toISOString() };
      onUpdate(updatedNote);
    }, 500);
  }, [note, title, text, todos, onUpdate]);

  const autosize = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    autosize(titleRef.current);
    autosize(textRef.current);
  }, [autosize]);

  const addTodoAfter = (id: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: "",
      completed: false,
    };
    setTodos((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, newTodo);
      return next;
    });
    setTimeout(() => todoRefs.current.get(newTodo.id)?.focus(), 0);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      const next = prev.filter((t) => t.id !== id);
      // focus previous or next
      const focusTarget = next[idx - 1] ?? next[idx];
      if (focusTarget)
        setTimeout(() => todoRefs.current.get(focusTarget.id)?.focus(), 0);
      return next;
    });
  };

  const handleTodoKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todo: Todo,
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addTodoAfter(todo.id);
    }
    if (e.key === "Backspace" && todo.text === "") {
      e.preventDefault();
      deleteTodo(todo.id);
    }
  };

  const toggleType = () => {
    setType((prev) => (prev === "text" ? "todo" : "text"));
  };

  return (
    <div className="relative z-10 flex flex-col justify-between border border-blue-100/80 bg-linear-to-r from-blue-50/20 to-blue-100/20 shadow-lg shadow-blue-900/20 rounded-2xl hover:-translate-y-1 transition-all duration-200">
      <div className="p-1 md:p-2 flex flex-col gap-1">
        <textarea
          ref={titleRef}
          value={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
            touch();
          }}
          onInput={(e) => autosize(e.currentTarget)}
          className="shrink-0 w-full resize-none overflow-hidden bg-transparent outline-none font-black text-base sm:text-lg text-blue-600 placeholder:text-blue-300"
        />

        {type === "text" && (
          <textarea
            ref={textRef}
            value={text}
            placeholder="Content"
            onChange={(e) => {
              setText(e.target.value);
              touch();
            }}
            onInput={(e) => autosize(e.currentTarget)}
            className="shrink-0 w-full resize-none overflow-hidden bg-transparent outline-none text-xs md:text-sm text-blue-900/80 placeholder:text-blue-300"
          />
        )}

        {type === "todo" && (
          <div className="flex flex-col gap-0.5">
            {todos.length === 0 && (
              <button
                type="button"
                onClick={() => {
                  const first: Todo = {
                    id: crypto.randomUUID(),
                    text: "",
                    completed: false,
                  };
                  setTodos([first]);
                  setTimeout(() => todoRefs.current.get(first.id)?.focus(), 0);
                  touch();
                }}
                className="shrink-0 text-left text-xs md:text-sm text-blue-300 hover:text-blue-400 transition-colors"
              >
                + Add a todo
              </button>
            )}
            {todos.map((td) => (
              <div key={td.id} className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={td.completed}
                  onChange={() => {
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === td.id ? { ...t, completed: !t.completed } : t,
                      ),
                    );
                    touch();
                  }}
                  className="accent-blue-500 shrink-0"
                />
                <input
                  ref={(el) => {
                    if (el) todoRefs.current.set(td.id, el);
                    else todoRefs.current.delete(td.id);
                  }}
                  type="text"
                  value={td.text}
                  placeholder="Todo"
                  onChange={(e) => {
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === td.id ? { ...t, text: e.target.value } : t,
                      ),
                    );
                    touch();
                  }}
                  onKeyDown={(e) => handleTodoKeyDown(e, td)}
                  className={`w-full bg-transparent outline-none text-xs md:text-sm text-blue-900/80 placeholder:text-blue-300 ${td.completed ? "line-through opacity-50" : ""}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0 w-full px-2 py-1 flex items-center justify-between bg-blue-50/80 rounded-b-2xl">
        <button
          type="button"
          onClick={toggleType}
          className="text-xs md:text-sm text-blue-600 hover:text-blue-400 transition-colors cursor-pointer"
        >
          {type === "text" ? "Text mode" : "Todo mode"}
        </button>
        <div className="flex items-center gap-2">
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
    </div>
  );
};

export default NoteCard;
