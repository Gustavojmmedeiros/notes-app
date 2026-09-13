import type { Request, Response } from 'express';
import type { Note, NoteFilters } from '../types/index.js';
import { parseId } from '../utils/fn.js';
import { errorHandler } from '../utils/handleError.js';
import { javaClient } from '../services/javaClient.js';
import { getTagsByLabels } from '../services/tagService.js';

export const getOne = async (req: Request, res: Response) => {

  validate(req);

  let id = parseId(req);

  if(!id) return res.status(404).json({ error: 'Note not found' });

  try {

    let response = await javaClient.get(`/notes/${id}`);

    return res.status(200).json({ note: response.data });

  } catch(e) {

    errorHandler(e, res);

  }
}

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
    
    errorHandler(e, res);
    
  }
}

export const getAll = async (req: Request, res: Response) => {
  
  validate(req);

  try {

    let response = await javaClient.get('/notes');
    
    return res.json({ notes: response.data });

  } catch(e) {

    errorHandler(e, res);

  }
}

export const insert = async (req: Request, res: Response) => {

  validate(req);

  let { title, content, tags = [] } = req.body;

  if(!title || !content) res.status(400).json({ error: 'Title and Content are mandatory' });

  try {

    let formattedTags = [];

    if(tags.length > 0) {

      if(typeof tags[0] === 'string') {
        let tagIds = await getTagsByLabels(tags);
        
        formattedTags = tagIds.map(id => ({ id }));

      } else if(typeof tags[0] === 'object' && tags[0].id) {
        formattedTags = tags.map((t: any) => ({ id: t.id }));

      } else if(typeof tags[0] === 'number') {
        formattedTags = tags.map((id: number) => ({ id }));

      }
    }

    let response = await javaClient.post('/notes', { title, content, tags: formattedTags });


    return res.status(201).json({ note: response.data });

  } catch(e) {

    errorHandler(e, res);

  }
}

export const update = async (req: Request, res: Response) => {

  validate(req);

  let { content, tags, title } = req.body, 
      updateData: any  = {},
      response;

  if(content !== undefined) updateData.content = content;
  if(tags !== undefined) updateData.tags = tags;
  if(title !== undefined) updateData.title = title;

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

      errorHandler(e, res);
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

      errorHandler(e, res);
    }

  }
}


export const remove = async (req: Request, res: Response) => {

  validate(req);

  let response;

  if(req?.body?.ids) {

    let { ids } = req.body;

    if(!Array.isArray(ids) || ids.length === 0) res.status(400).json({ error: 'Invalid ids' });

    try {

      response = await javaClient.delete('/notes', { data: { ids } });

      console.log('response: ', response);

      return res.json({ result: response.data });

    } catch(e) {

      errorHandler(e, res);
    }

  } else if(req?.params?.id) {

    let id = parseId(req);
  
    if(!id) return res.status(404).json({ error: 'Note not found' });

    try {

      response = await javaClient.delete(`/notes/${id}`);

      console.log('response: ', response);
      
      return res.json({ result: response.data });

    } catch(e) {

      errorHandler(e, res);
    }
  }

}

// Helper Function
const validate = (req: Request) => {
  if(!req || (!req.body == null && req.params == null)) new Error('Invalid Request');
  
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