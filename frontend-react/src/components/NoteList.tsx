import NoteCard from './NoteCard';
import { Note } from '../types/index';

interface NoteListProps {
  notes: Note[];
  loading: boolean;
}

const NoteList = ({ notes, loading }: NoteListProps) => {

  if (loading) return <p>Loading...</p>;
  if (notes.length === 0) return <p>No notes found</p>;

  return (
    <div className="div-NoteList">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;