import type { Request } from 'express';

export interface NoteFilters {
  title?: string;
  tag?: string;
}

export const parseNoteFilters = (req: Request): NoteFilters => {
  let { title, tag } = req.query;

  let filters: NoteFilters = {};

  if(typeof title === 'string') filters.title = title;
  if(typeof tag === 'string') filters.tag = tag;

  return filters;
}