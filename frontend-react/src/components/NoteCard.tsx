import './components.css';
import { Link } from 'react-router-dom';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <div className='div-NoteCard'>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div>
        {note.tags.map((tag, index) => (
          <span key={index} style={{ background: '#eee', padding: '4px 8px', marginRight: '4px' }}>
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/notes/${note.id}`}>Edit Note</Link>
    </div>
  );
};

export default NoteCard;