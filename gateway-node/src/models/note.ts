import type { Tag } from './tag.ts';

export interface Note {
    id: number;
    title: string;
    content: string;
    tags: string[] | Tag[];
    createdAt: string;
    updatedAt: string;
}