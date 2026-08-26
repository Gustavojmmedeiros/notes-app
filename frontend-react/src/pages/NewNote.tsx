import { useNavigate } from 'react-router-dom';
import { createNote } from '../api/notes';
import NoteForm from '../components/NoteForm'
import { BackButton } from '../components/Button';
import { Note } from '../types/index';

interface NewNoteProps {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NewNote = ({ setNotes }: NewNoteProps) => {

  const navigate = useNavigate();

  const handleSubmit = async (data: { title: string, content: string, tags: string[] }) => {
  
    try {
      
      const response = await createNote(data);
      const newNote = response.data.note;

      setNotes((prev) => [ newNote, ...prev]);

      navigate('/');

    } catch(error) {

      alert('Error creating note');

    }
  };

  return (
    <div>
      <BackButton />
      <h1>Criar nova nota</h1>
      <NoteForm onSubmit={handleSubmit} submitLabel="Criar nota"/>
    </div>
  );
};

export default NewNote;