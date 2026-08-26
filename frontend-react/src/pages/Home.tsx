import Header from '../components/Header';
import NoteList from '../components/NoteList';
import { Note } from '../types/index';


interface HomeProps {
  notes: Note[];
  loading: boolean;
}

const Home = ({ notes, loading }: HomeProps) => {

  return (
    <div>
      <Header />
      <NoteList notes={notes} loading={loading} />
    </div>
  );
};

export default Home;