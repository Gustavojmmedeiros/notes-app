import express from 'express';
import * as notesController from '../controllers/notesController.js';

const notesRouter = express.Router();

notesRouter.get('/:id', notesController.getOne);
notesRouter.get('/filter', notesController.getMany);
notesRouter.get('/', notesController.getAll);

// insert recebe nota pelo body
notesRouter.post('/', notesController.insert);

// updateMany recebe filtro pelo body
notesRouter.patch('/:id', notesController.updateOne);
notesRouter.patch('/', notesController.updateMany);

// deleteMany recebe filtro pelo body
notesRouter.delete('/:id', notesController.deleteOne);
notesRouter.delete('/', notesController.deleteMany);

export default notesRouter;