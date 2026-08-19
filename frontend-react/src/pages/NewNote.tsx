import { useNavigate } from 'react-router-dom';
import { createNote } from '../api/notes';
import NoteForm from '../components/NoteForm'
import { BackButton } from '../components/Button';
import { useNotes } from '../hooks/useNotes';

const NewNote = () => {
  const navigate = useNavigate();
  const { fetchNotes } = useNotes();

  const handleSubmit = async (data: { title: string, content: string, tags: string[] }) => {
  
    try {
      await createNote(data);
      await fetchNotes();

      navigate('/', { state: { refresh: true } });

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