import type { Request, Response } from 'express';
import type { Note } from '../types/index.js';
import { parseId, parseNoteFilters } from '../utils/fn.js';
import { javaClient } from '../services/javaClient.js';

// Simulação de banco em memória (temporário)
let notes: Note[] = [];
let nextId = 1;

// '/:id'
export const getOne = (req: Request, res: Response) => {

  validate(req);

  let id   = parseId(req),
      note = notes.find(n => n.id === id);

  if(!note) return res.status(404).json({ error: 'Note not found' });

  return res.json({ result: note });
}

// 'query'
export const getMany = (req: Request, res: Response) => {

  validate(req);

  let filters       = parseNoteFilters(req),
      filteredNotes = notes;

  if(filters.title) filteredNotes = filteredNotes.filter(n => n.title.includes(filters.title!));
  if(filters.tag) filteredNotes = filteredNotes.filter(n => n.title.includes(filters.tag!));

  return res.json({ result: filteredNotes });
}

// '/'
export const getAll = async (req: Request, res: Response) => {

  validate(req);

  // return res.json({ result: notes });

  try {

    let response = await javaClient.get('/notes');
    
    return res.json({ notes: response.data });

  } catch(e) {

    console.log('Erro: ', e);
    return res.status(500).json({ error: 'Error fetching notes' });
  }
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

  return res.status(201).json({ result: note });
}

// '/:id' or 'body'
export const update = (req: Request, res: Response) => {

  validate(req);

  let notesToUpdate: Note[] = [];

  // updateMany /api/notes/
  if(req.body?.ids) {

    let { ids } = req.body;

    if(!Array.isArray(ids) || ids.length === 0) res.status(400).json({ error: 'Invalid ids' });

    for(const id of ids) {

      let note = notes.find(n => n.id === id);

      if(!note) return res.status(404).json({ error: `Note with id ${id} does not exist` });

      notesToUpdate.push(note);
    }

    // updateOne /api/notes/:id
  } else if(req?.params && req.body.id) {

    let id = parseId(req), // id da nota
      note = notes.find(n => n.id === id); //

    if(!note) return res.status(404).json({ error: 'Note does not exist' });

    notesToUpdate.push(note);

  } else {

    return res.status(400).json({ error: 'Invalid request for remove' });
  }

  let { title, content, tags = [] } = req.body; // campos a atualizar individualmente (opcionais)

  // TODO: se não tiver nada pra atualizar, não faz nada
  if(!title && !content && !tags) return res.status(400).json({ error: 'Nothing to update' });

  for(const note of notesToUpdate) {
    note.title     = title ?? note.title;
    note.content   = content ?? note.content;
    note.tags      = tags ?? note.tags;
    note.updatedAt = new Date().toISOString();
  }

  return res.status(200).json({ result: notesToUpdate });

}


// '/:id' or 'body'
export const remove = (req: Request, res: Response) => {

  validate(req);

  let idsToRemove: number[] = [],
      notesLength           = notes.length;

  // removeMany /api/notes/
  if(req?.body?.ids) {

    let { ids } = req.body;

    if(!Array.isArray(ids) || ids.length === 0) res.status(400).json({ error: 'Invalid ids' });

    idsToRemove = ids;

    // removeOne /api/notes/:id
  } else if(req?.params?.id) {

    let id = parseId(req);
  
    if(!id) return res.status(404).json({ error: 'Note not found' });
  
    idsToRemove = [id];
    
  } else {
    
    return res.status(400).json({ error: 'Invalid request for remove' });
  }
  
  notes = notes.filter(n => !idsToRemove.includes(n.id));

  if(notes.length === notesLength) {
    return res.status(404).json({ error: 'Unable to remove notes' });

  } else if(notes.length === (notesLength - idsToRemove.length)) {
    return res.status(200).json({ result: idsToRemove });

  }
  
}

// Helper Function
const validate = (req: Request) => {
  if(!req || (!req.body == null && req.params == null)) new Error('Invalid Request');
  
  // se tem body é getMany, insert, update ou delete
  // se tem id é getOne, update ou delete
  let id = req.params?.id;

  if(id && id !== undefined && typeof id === 'string') {
    let numId = parseInt(id);

    if(isNaN(numId)) new Error('Invalid id NaN');
  }
}