import { Link, useNavigate } from 'react-router-dom';
import { createNote } from '../api/notes';
import NoteForm from '../components/NewNoteForm'
import BackButton from '../components/Button';

const NewNote = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: { title: string, content: string, tags: string[] }) => {

    console.log('title: ', data.title);
    console.log('content: ', data.content);
    console.log('tags: ', data.tags);
    
    try {
      await createNote(data);

      navigate('/');

    } catch(error) {

      console.log('Erro criando nota: ', error);
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