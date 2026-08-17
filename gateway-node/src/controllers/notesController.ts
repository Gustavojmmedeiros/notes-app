import type { Request, Response } from 'express';
import type { Note, NoteFilters } from '../types/index.js';
import { parseId } from '../utils/fn.js';
import { javaClient } from '../services/javaClient.js';
import axios from 'axios';

// '/:id'
export const getOne = async (req: Request, res: Response) => {

  validate(req);

  let id = parseId(req);

  if(!id) return res.status(404).json({ error: 'Note not found' });

  try {

    let response = await javaClient.get(`/notes/${id}`);

    return res.status(200).json({ note: response.data });

  } catch(e) {

    if(axios.isAxiosError(e)) {
      if(e.response?.status === 404) return res.status(404).json({ error: `Cannot find note with id ${id}` })
    }
  
    if(e instanceof Error && e.message.includes('ECONNREFUSED')) return res.status(503).json({ error: 'Notes service unavailable' });
    
    return res.status(500).json({ error: `Error fetching note with id ${id}` });
    
  }
}

// 'query'
export const getMany = async (req: Request, res: Response) => {

  validate(req);

  let filters = parseNoteFilters(req);

  try {

    let params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if(value === undefined || value === null) return;

      if(key === 'ids' && Array.isArray(value) && value.length > 0) {
        params.append('ids', value.join(','));

      } else if(typeof value === 'string') {
        params.append(key, value);
      }
    });
    
    let formattedParams = params.toString(),
        response        = await javaClient.get(`/notes?${formattedParams}`);

    return res.status(200).json({ notes: response.data });
    
  } catch(e) {
    
    if(axios.isAxiosError(e)) {
      if(e.response?.status === 404) return res.status(404).json({ error: `Cannot find notes with selected filters` });
    }

    if(e instanceof Error && e.message.includes('ECONNREFUSED')) return res.status(503).json({ error: 'Notes service unavailable' });

    return res.status(500).json({ error: 'Error fetching notes' });
    
  }
}

// '/'
export const getAll = async (req: Request, res: Response) => {

  console.log('getAll');
  
  validate(req);

  try {

    let response = await javaClient.get('/notes');
    
    return res.json({ notes: response.data });

  } catch(e) {

    return res.status(500).json({ error: 'Error fetching notes' });

  }
}

// 'body'
export const insert = async (req: Request, res: Response) => {

  validate(req);

  console.log('req.body: ', req.body);

  let { title, content, tags = [] } = req.body;

  if(!title || !content) res.status(400).json({ error: 'Title and Content are mandatory' });

  try {

    let response = await javaClient.post('/notes', { title, content, tags });

    console.log('Insert do gateway, response: ', response);

    return res.status(201).json({ note: response.data });

  } catch(e) {

    if(axios.isAxiosError(e)) {
      if(e.response) return res.status(e.response.data).json(e.response.data);
    }

    if(e instanceof Error && e.message.includes('ECONNREFUSED')) return res.status(503).json({ error: 'Notes service unavailable' });

    return res.status(500).json({ error: 'Error creating note' });

  }
}

// '/:id' or 'body'
export const update = async (req: Request, res: Response) => {

  validate(req);

  let { content, tags, title } = req.body, 
      updateData: any  = {},
      response;

  if(content !== undefined) updateData.content = content;
  if(tags !== undefined) updateData.tags = tags;
  if(title !== undefined) updateData.title = title;

  // updateMany /api/notes/
  if(req.body?.ids) {

    let { ids } = req.body;

    updateData.ids = ids;

    if(!Array.isArray(ids) || ids.length === 0) res.status(400).json({ error: 'Invalid ids' });

    try {

      if(!updateData.ids) res.status(500).json({ error: 'Ids must not be null' });

      response = await javaClient.patch('/notes', updateData);

      res.json({ result: response.data });
      // res.json({ result: response.data.ids }); retornar os ids atualizados

    } catch(e) {

      if(axios.isAxiosError(e)) {
        if(e.response) {
          return res.status(e.response.status).json(e.response.data);}
      }

      if(e instanceof Error && e.message.includes('ECONNREFUSED')) return res.status(503).json({ error: 'Notes service unavailable' });

      return res.status(500).json({ error: 'Error updating notes' }); 
    }

    // updateOne /api/notes/:id
  } else if(req?.params) {

    let id = parseId(req);

    if(isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    try {

      response = await javaClient.patch(`/notes/${id}`, updateData);

      res.json({ result: response.data });
      // res.json({ result: response.data.ids }); retornar o id atualizado?

    } catch(e) {

      if(axios.isAxiosError(e)) {
        if(e.response) return res.status(e.response.data).json(e.response.data);
      }

      if(e instanceof Error && e.message.includes('ECONNREFUSED')) return res.status(503).json({ error: 'Notes service unavailable' });

      return res.status(500).json({ error: 'Error updating note' });
    }

  }
}


// '/:id' or 'body'
export const remove = async (req: Request, res: Response) => {

  validate(req);

  let response;

  // removeMany /api/notes/
  if(req?.body?.ids) {
    console.log('removeMany - req.body: ', req.body);

    let { ids } = req.body;

    if(!Array.isArray(ids) || ids.length === 0) res.status(400).json({ error: 'Invalid ids' });

    try {

      response = await javaClient.delete('/notes', { data: { ids } });

      return res.json({ result: response.data });

    } catch(e) {

      if(axios.isAxiosError(e)) {
        if(e.response) return res.status(e.response.data).json(e.response.data);
      }

      if(e instanceof Error && e.message.includes('ECONNREFUSED')) return res.status(503).json({ error: 'Notes service unavailable' });

      return res.status(500).json({ error: 'Error removing note' });
    }

    // removeOne /api/notes/:id
  } else if(req?.params?.id) {

    let id = parseId(req);
  
    if(!id) return res.status(404).json({ error: 'Note not found' });

    try {

      response = await javaClient.delete(`/notes/${id}`);
      
      return res.json({ result: response.data });

    } catch(e) {

      if(axios.isAxiosError(e)) {
        if(e.response) return res.status(e.response.data).json(e.response.data);
      }

      if(e instanceof Error && e.message.includes('ECONNREFUSED')) return res.status(503).json({ error: 'Notes service unavailable' });

      return res.status(500).json({ error: 'Error removing note' });
    }
    
  } else {
    
    return res.status(400).json({ error: 'Invalid request for remove' });
  }
  // notes = notes.filter(n => !idsToRemove.includes(n.id));

  // if(notes.length === notesLength) {
  //   return res.status(404).json({ error: 'Unable to remove notes' });

  // } else if(notes.length === (notesLength - idsToRemove.length)) {
  //   return res.status(200).json({ result: idsToRemove });

  // }
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

const parseNoteFilters = (req: Request): NoteFilters => {
  let { content, ids, tag, title } = req.body;

  let filters: NoteFilters = {};

  if(typeof content === 'string') filters.content = content;
  if(typeof tag === 'string') filters.tag = tag;
  if(typeof title === 'string') filters.title = title;
  if(Array.isArray(ids) && ids.every(id => typeof id === 'number')) filters.ids = ids;

  return filters;
}