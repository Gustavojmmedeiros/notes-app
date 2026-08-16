import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/notes';

export const getNotes = () => axios.get(API_BASE);

export const createNote = (data: any) => {
  console.log('Chamando createNote: ', API_BASE, data);
  axios.put(API_BASE, data);
}

export const getNoteById = (id: number) => axios.get(`${API_BASE}/${id}`);

export const updateNote = (id: number, data: any) => axios.patch(`${API_BASE}/${id}`, data);

export const deleteNote = (id: number) => axios.delete(`${API_BASE}/${id}`);