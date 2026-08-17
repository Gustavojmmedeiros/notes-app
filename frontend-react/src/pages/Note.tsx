import '../styles/components.css';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, updateNote } from '../api/notes';
import { Note as NoteType } from '../types';
import { BackButton } from '../components/Button';
import NoteForm from '../components/NewNoteForm';

const Note = () => {

  const { id } = useParams<{ id: string}>();
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {

    const fetchNote = async () => {

      try {

        const response = await getNoteById(Number(id));
        console.log('Resposta gateway: ', response);
        console.log('Resposta data: ', response.data);

        setNote(response.data.note);

      } catch(e) {

        console.log('Error fetching note: ', e);

      } finally {

        setLoading(false);

      }
    };

    fetchNote();

  }, [id]);

  const handleUpdate = async (data: { title: string; content: string; tags: string[] }) => {

    try {

      const response = await updateNote(Number(id), data);

      setNote(response.data.note);
      setEditing(false);

    } catch(e) {

      console.log('Error modifying note', e);

    }
  }

  if(loading) return <p>Loading...</p>
  if(!note) return <p>Note not found</p>

  return (
    <div>
      {/* <Link to="../">Back</Link> */}
      <BackButton />
      {editing ? (
        <>
          <h1>Edit Note</h1>
          <NoteForm 
            initialData={note} 
            onSubmit={handleUpdate} 
            submitLabel='Save'
          />
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h1>Title: {note.title}</h1>
          <p>Content: {note.content}</p>
          <div>
            Tags:
            {note.tags.map((tag, index) => (
              <span key={index}>
                {tag}
              </span>
            ))}
          </div>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Note;