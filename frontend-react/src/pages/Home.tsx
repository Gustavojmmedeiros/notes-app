import Header from '../components/Header';
import { Link } from 'react-router-dom';
import NoteList from '../components/NoteList';

const Home = () => {
  return (
    <div>
      {/* <h1>Lista de notas</h1> */}
      <Header />
      <Link to="/notes/new">Criar nova nota</Link>
      <NoteList />
    </div>
  );
};

export default Home;