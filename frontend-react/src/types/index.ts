export interface Note {
    id: number;
    title: string;
    content: string;
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
}

export interface Tag {
  id: number;
  label: string;
}