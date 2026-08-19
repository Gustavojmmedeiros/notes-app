import '../styles/components.css';
import '../styles/pages.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById, updateNote } from '../api/notes';
import { Note as NoteType } from '../types';
import { BackButton } from '../components/Button';
import NoteForm from '../components/NoteForm';

const Note = () => {

  const { id } = useParams<{ id: string}>();
  const [note, setNote] = useState<NoteType | null>(null);
  const [loading, setLoading] = useState(true);

  // const [editing, setEditing] = useState(false);
  // const [editing, setEditing] = useState(false);
  // const [editing, setEditing] = useState(false);

  const fetchNote = async () => {

    try {

      const response = await getNoteById(Number(id));
      console.log('Response fetchNote: ', response);
      console.log('response.data: ', response.data);

      // Fallback
      const noteData = response.data?.note || response.data;

      setNote(noteData);

    } catch(e) {

      console.log('Error fetching note: ', e);
      setNote(null);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    console.log('Id recebido em useEffect de Note.tsx: ', id);

    fetchNote();

  }, [id]);

  const handleUpdate = async (data: { title: string; content: string; tags: string[] }) => {

    try {

      await updateNote(Number(id), data);

    } catch(e) {

      console.log('Error modifying note', e);

    }
  }

  if(loading) return <p>Loading...</p>
  if(!note) return <p>Note not found</p>

  return (
    // <div>
    //   <BackButton />
    //   {editing ? (
    //     <>
    //       <h1>Edit Note</h1>
    //       <NoteForm 
    //         initialData={note || undefined} 
    //         onSubmit={handleUpdate} 
    //         submitLabel='Save'
    //       />
    //       <button onClick={() => setEditing(false)}>Cancel</button>
    //     </>
    //   ) : (
    //     <>
    //       <h1>Title: {note.title}</h1>
    //       <div>
    //         <input />
    //         {note.tags.map((tag, index) => (
    //           <span key={index}>
    //             {tag}
    //           </span>
    //         ))}
    //       </div>
    //       <p>Content: {note.content}</p>
    //       <button onClick={() => setEditing(true)}>Save</button>
    //     </>
    //   )}
    // </div>
    <div>
      <BackButton />
      <NoteForm 
        initialData={note} 
        onSubmit={handleUpdate}
        submitLabel='Save'
      />
    </div>
  );
};

export default Note;