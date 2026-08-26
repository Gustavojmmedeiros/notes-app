import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewNote from './pages/NewNote';
import { Note } from './types';
import { getNotes } from './api/notes';
import NotePage from './pages/NotePage';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    
    setLoading(true);

    try {

      const response = await getNotes();

      setNotes(response.data.notes);

    } catch(e) {

      console.log('Error fetching notes: ', e);

    } finally {

      setLoading(false);

    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchNotes();

  }, [fetchNotes]);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Home notes={notes} loading={loading}/>} 
        />
        <Route 
          path="/notes/new" 
          element={<NewNote setNotes={setNotes} />} 
        />
        <Route 
          path="/notes/:id" 
          element={<NotePage setNotes={setNotes} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
