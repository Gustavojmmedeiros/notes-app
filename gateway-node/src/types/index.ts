export interface Note {
    id: number;
    title: string;
    content: string;
    tags: string[] | Tag[];
    createdAt: string;
    updatedAt: string;
}

export interface Tag {
    id: number;
    title: string;
    color?: string;
}

export interface NoteFilters {
  ids?: number[];
  content?: string;
  tag?: string;
  title?: string;
}
