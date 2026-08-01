import type { Request, Response } from 'express';
import type { Note } from '../types/index.js';
import { parseId, parseNoteFilters } from '../utils/fn.js';

// Simulação de banco em memória (temporário)
let notes: Note[] = [];
let nextId = 1;

// '/:id'
export const getOne = (req: Request, res: Response) => {

  validate(req);

  let id   = parseId(req),
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
    // TODO: trocar nextId (dentro da função)
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

export const updateOne = (req: Request, res: Response) => {

  validate(req);
  
  let id = parseId(req), // id da nota
      { title, content, tags } = req.body, // campos a atualizar (opcionais)
      note = notes.find(n => n.id === id); // 

  if(!note) return res.status(404).json({ error: 'Note does not exist' });

  console.log('note: ', note);
  console.log('id alvo: ', id);
  console.log('title: ', title);

  // TODO: se não tiver nada pra atualizar, não faz nada
  if(!title && !content && !tags) return res.status(400).json({ error: 'Nothing to update' });

  note.title = title ?? note.title;
  note.content = content ?? note.content;
  note.tags = tags ?? note.tags;
  note.updatedAt = new Date().toISOString();

  return res.status(200).json({ note });

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