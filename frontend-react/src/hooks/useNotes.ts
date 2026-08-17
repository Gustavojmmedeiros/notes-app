import { useEffect, useState } from "react";
import { getNotes } from "../api/notes";
import { Note } from '../types';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    const fetchNotes = async () => {

      try {
        const response = await getNotes();

        setNotes(response.data.notes);

      } catch(e) {
        console.log('Erro ao buscar notas: ', e);

      } finally {
        setLoading(false);

      }
    };

    useEffect(() => {
      fetchNotes();
    }, []);
  }

  return { notes, loading, fetchNotes };
}