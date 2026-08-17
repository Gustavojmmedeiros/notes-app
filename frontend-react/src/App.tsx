import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewNote from './pages/NewNote';
import Note from './pages/Note';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/new" element={<NewNote />} />
        <Route path="/notes/:id" element={<Note />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
