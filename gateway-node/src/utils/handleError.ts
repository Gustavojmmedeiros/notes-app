import type { Response } from 'express';
import axios from 'axios';

// function setId(req: object) {
    // if(!req?.params?.id) new Error('Wrong usage of setId()');
// }

export const errorHandler = (err: unknown, res: Response): Response => {

  // Axios error - backend connection
  if(axios.isAxiosError(err)) {
    if(err.response) return res.status(err.response.status).json(err.response.data);

    if(err.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'Service unavailable',
        message: 'Notes service not responding'
      });
    }
  }

  if(err instanceof Error) {
    let message = err.message.toLowerCase(),
        status = 500;

    if(message.includes('not found')) status = 404;
    if(message.includes('duplicate') || message.includes('already exists')) status = 409;
    if(message.includes('invalid') || message.includes('empty') || message.includes('undefined')) status = 400;
    if(message.includes('unauthorized') || message.includes('forbidden')) status = 403;

    return res.status(status).json({
      error: err.name || 'Error',
      message: err.message
    });
  }

  // Unknown error
  return res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
}