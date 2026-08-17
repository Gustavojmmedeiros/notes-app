import '../styles/components.css';
import { useEffect, useState } from 'react';
import { getNotes } from '../api/notes';
import { Note } from '../types';
import NoteCard from './NoteCard';
import { useNotes } from '../hooks/useNotes';

const NoteList = () => {
  const { notes, loading } = useNotes();
  // const [notes, setNotes] = useState<Note[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchNotes = async () => {

  //     try {
  //       const response = await getNotes();

  //       setNotes(response.data.notes);

  //     } catch(e) {
  //       console.log('Erro ao buscar notas: ', e);

  //     } finally {
  //       setLoading(false);

  //     }
  //   };

  //   fetchNotes();

  // }, []);

  if(loading) return <p>Loading...</p>

  if(notes.length === 0) return <p>No notes found</p>

  return (
    <div className='div-NoteList'>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;