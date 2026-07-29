import type { Request, Response } from 'express';
import type { Note } from '../models/note.js';
import { parseNoteFilters } from '../utils/fn.js';

// Simulação de banco em memória (temporário)
let notes: Note[] = [];
let nextId = 1;

// '/:id'
export const getOne = (req: Request, res: Response) => {

  validate(req);

  let id   = parseInt(req.params.id as string),
      note = notes.find(n => n.id === id);

  if(!note) return res.status(404).json({ error: 'Note not found' });

  return res.json({ note });
}

// 'query'
export const getMany = (req: Request, res: Response) => {

  validate(req);

  let filters       = parseNoteFilters(req),
      filteredNotes = notes;

  if(filters.title) filteredNotes = filteredNotes.filter(n => n.title.includes(filters.title!));
  if(filters.tag) filteredNotes = filteredNotes.filter(n => n.title.includes(filters.tag!));

  return res.json({ notes: filteredNotes });
}

// '/'
export const getAll = (req: Request, res: Response) => {

  validate(req);

  return res.json({ notes });
}

// 'body'
export const insert = (req: Request, res: Response) => {

  validate(req);

  let { title, content, tags = [] } = req.body;

  if(!title || !content) res.status(400).json({ error: 'Title and Content are mandatory' });

  const note: Note = {
    id: nextId++,
    title: title,
    content: content,
    tags: tags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  notes.push(note);

  return res.status(201).json({ note: note });
}

// '/:id and body'
export const updateOne = (req: Request, res: Response) => {

  validate(req);
}

// 'body'
export const updateMany = (req: Request, res: Response) => {

  validate(req);
}

// '/:id'
export const deleteOne = (req: Request, res: Response) => {

  validate(req);
}

// 'body'
export const deleteMany = (req: Request, res: Response) => {

  validate(req);
}

// Helper Function
const validate = (req: Request) => {
  if(!req || (!req.body == null && req.params == null)) new Error('Invalid Request');
  
  // se tem body é getMany, insert, updateOne, updateMany ou deleteMany
  // se tem id é getOne, updateOne ou deleteOne
  let id = req.params?.id;

  if(id && id !== undefined && typeof id === 'string') {
    let numId = parseInt(id);

    if(isNaN(numId)) new Error('Invalid id NaN');
  }
}