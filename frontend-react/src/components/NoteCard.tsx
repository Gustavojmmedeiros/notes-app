import '../styles/components.css';
import { Note } from '../types';
import { EditNoteButton } from './Button';

interface NoteCardProps {
  note: Note;
  // to: string;
}

const NoteCard = ({ note }: NoteCardProps) => {

  return (
    <div className='div-NoteCard'>
      <div className='div-NoteCardContent'>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>
      <div className='div-NoteCardTags'>
        Tags: 
        {note.tags.map((tag, index) => (
          <span key={index} className='tag'>
            {tag}
          </span>
        ))}
      </div>
      <EditNoteButton id={note.id} />
    </div>
  );
};

export default NoteCard;