import express from 'express';
import * as notesController from '../controllers/notesController.js';

const router = express.Router();

router.get('/:id', notesController.getOne);
router.get('/filter', notesController.getMany);
router.get('/', notesController.getAll);

// insert recebe nota pelo body
router.post('/', notesController.insert);

// updateMany recebe filtro pelo body
router.put('/:id', notesController.updateOne);
router.put('/', notesController.updateMany);

// deleteMany recebe filtro pelo body
router.delete('/:id', notesController.deleteOne);
router.delete('/', notesController.deleteMany);

export default router;