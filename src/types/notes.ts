export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface BaseNote {
  id: string;
  title?: string;
  updatedAt: string;
}

interface TextNote extends BaseNote {
  type: "text";
  content?: string;
}

interface TodoNote extends BaseNote {
  type: "todo";
  content?: Todo[];
}

export type Note = TextNote | TodoNote;
