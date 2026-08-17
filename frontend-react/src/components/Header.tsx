import '../styles/components.css';
import { NewNoteButton } from './Button';

const Header = () => {
  
  return (
    <div className="Header">
      <h1>Notes App</h1>
      <NewNoteButton />
    </div>
  )
}

export default Header;