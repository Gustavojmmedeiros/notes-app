import '../styles/components.css';
import NoteCard from './NoteCard';
import { useNotes } from '../hooks/useNotes';

const NoteList = () => {
  const { notes, loading } = useNotes();

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