import type { Request } from 'express';
import type { NoteFilters } from '../types/index.js';

export const parseId = (req: Request) => {
  let { id } = req.params;

  return parseInt(id as string);
}

// export const parseNoteFilters = (req: Request): NoteFilters => {
//   let { content, ids, tag, title } = req.query;

//   let filters: NoteFilters = {};

//   if(typeof content === 'string') filters.content = content;
//   if(typeof tag === 'string') filters.tag = tag;
//   if(typeof title === 'string') filters.title = title;
//   if(Array.isArray(ids) && ids.every(id => typeof id === 'number')) filters.ids = ids;

//   return filters;
// }