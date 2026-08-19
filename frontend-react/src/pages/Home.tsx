import { useLocation, useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useEffect } from 'react';
import Header from '../components/Header';
import NoteList from '../components/NoteList';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchNotes } = useNotes();

  useEffect(() => {

    // If state is refresh, reload and clean state
    if(location.state?.refresh) {
      fetchNotes();

      navigate('/', { replace: true, state: {} });
    }
    // Dependencies: effect will only activate if the values are present 
  }, [location.state, fetchNotes]);

  return (
    <div>
      <Header />
      <NoteList />
    </div>
  );
};

export default Home;