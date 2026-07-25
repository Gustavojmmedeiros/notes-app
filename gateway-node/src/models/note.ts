import type { Tag } from './tag';

export interface Note {
    id: number;
    title: string;
    content: string;
    tags: string[] | Tag[];
    createdAt: string;
    updatedAt: string;
}