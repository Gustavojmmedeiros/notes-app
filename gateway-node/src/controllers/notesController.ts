import type { Request, Response } from 'express';
import type { Note } from '../models/note.js';

// Simulação de banco em memória (temporário)
let notes: Note[] = [];
let nextId = 1;

export function getOne(req: Request, res: Response) {

    validate(req);
}

export function getMany(req: Request, res: Response) {

    validate(req);
}

export function getAll(req: Request, res: Response) {

    validate(req);
}

export function insert(req: Request, res: Response) {

    validate(req);
}

export function updateOne(req: Request, res: Response) {

    validate(req);
}

export function updateMany(req: Request, res: Response) {

    validate(req);
}

export function deleteOne(req: Request, res: Response) {

    validate(req);
}

export function deleteMany(req: Request, res: Response) {

    validate(req);
}

// Helper Function
function validate(req: Request) {
    if(!req || (!req.body == null && req.params == null)) new Error('Invalid Request');
}