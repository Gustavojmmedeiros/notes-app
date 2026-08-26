import { createContext, useContext, useEffect, useState } from 'react';
import { getNotes } from '../api/notes';
// import NoteList from '../components/NoteList';
import { Note } from '../types';

interface NotesContextType {
  notes: Note[];
}

interface NewNotesContextType {
  notes: Note[];
  loading: boolean;
  fetchNotes: () => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);
const NotesNewContext = createContext<NewNotesContextType | undefined>(undefined);

export function useList() {
  const context = useContext(NotesContext);

  if(!context) {
    throw new Error('useList must be used within a NotesListProvider');
  }

  return context;
}

export function useNewList() {
  const context = useContext(NotesNewContext);

  if(!context) {
    throw new Error('useList must be used within a NotesListProvider');
  }

  return context;
}

export const NotesListProvider = ({ children }: { children: React.ReactNode }) => {
  // A lista, inicialmente, é uma Note[], um array de notas
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  return (
    <NotesContext.Provider value={{ notes }}>

    </NotesContext.Provider>
  )
};

export default NotesListProvider;