import '../styles/components.css';
import { Note } from '../types';
import { EditNote } from './Button';

interface NoteCardProps {
  note: Note;
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
          <span key={index}>
            {tag}
          </span>
        ))}
      </div>
      {/* <Link to={`/notes/${note.id}`}>Edit Note</Link> */}
      <EditNote id={note.id}/>
    </div>
  );
};

export default NoteCard;