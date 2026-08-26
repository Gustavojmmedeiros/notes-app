import '../styles/components.css';
import '../styles/pages.css';
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById, updateNote } from '../api/notes';
import { Note as NoteType } from '../types';
import { BackButton } from '../components/Button';
import NoteForm from '../components/NoteForm';

interface NotePageProps {
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}

const NotePage = ({ setNotes }: NotePageProps) => {

  const { id } = useParams<{ id: string}>();
  const [note, setNote] = useState<NoteType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNote = useCallback(async () => {

    try {

      const response = await getNoteById(Number(id));

      // Fallback
      const noteData = response.data?.note || response.data;

      setNote(noteData);

    } catch(e) {

      console.log('Error fetching note: ', e);
      setNote(null);

    } finally {

      setLoading(false);

    }
  }, [id]);

  useEffect(() => {
    fetchNote();

  },[fetchNote]);

  const handleUpdate = async (data: { title: string; content: string; tags: string[] }) => {

    try {

      const response = await updateNote(Number(id), data);
      const updatedNote = response.data?.note || response.data?.result || response.data;

      console.log('nota depois: ', updatedNote);

      setNotes((prev: NoteType[]) => {
        const newNotes = prev.map((note: NoteType) =>
          note.id === updatedNote.id ? updatedNote : note
        );
        return newNotes;
        }
      );

      await fetchNote();

    } catch(e) {

      console.log('Error modifying note', e);

    }
  }

  if(loading) return <p>Loading...</p>
  if(!note) return <p>Note not found</p>

  return (
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

export default NotePage;