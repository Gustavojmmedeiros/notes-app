import express from 'express';
import * as notesController from '../controllers/notesController.js';

const notesRouter = express.Router();

notesRouter.get('/filter', notesController.getMany);
notesRouter.get('/:id', notesController.getOne);
notesRouter.get('/', notesController.getAll);

// insert recebe nota pelo body
notesRouter.put('/', notesController.insert);

// updateMany recebe filtro pelo body
notesRouter.patch('/:id', notesController.update);
notesRouter.patch('/', notesController.update);

// deleteMany recebe filtro pelo body
notesRouter.delete('/:id', notesController.remove);
notesRouter.delete('/', notesController.remove);

export default notesRouter;