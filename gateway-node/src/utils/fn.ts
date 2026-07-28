import type { Request } from 'express';
import type { NoteFilters } from '../types/index.js';

function setId(req: object) {
    // if(!req?.params?.id) new Error('Wrong usage of setId()');
}

export const parseNoteFilters = (req: Request): NoteFilters => {
  let { title, tag } = req.query;

  let filters: NoteFilters = {};

  if(typeof title === 'string') filters.title = title;
  if(typeof tag === 'string') filters.tag = tag;

  return filters;
}