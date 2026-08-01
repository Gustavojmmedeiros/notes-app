import type { Request } from 'express';
import type { NoteFilters } from '../types/index.js';

export const parseId = (req: Request) => {
  let { id } = req.params;

  return parseInt(id as string);
}

export const parseNoteFilters = (req: Request): NoteFilters => {
  let { title, tag } = req.query;

  let filters: NoteFilters = {};

  if(typeof title === 'string') filters.title = title;
  if(typeof tag === 'string') filters.tag = tag;

  return filters;
}