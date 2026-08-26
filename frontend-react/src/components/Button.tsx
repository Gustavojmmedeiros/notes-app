import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  className?: string;
}

interface CreateNoteButtonProps {
  action: 'submit';
}

interface EditNoteButtonProps {
  id: number;
  variant?: 'primary' | 'secondary' | 'danger';
  children?: React.ReactNode;
  className?: string;
}

export const LinkButton = ({ 
  to, 
  children, 
  variant, 
  className = '' 
}: LinkButtonProps) => {

  const variantClass = variant ? `link-button-${variant}` : '';

  return (
    <Link to={to} className={`link-button ${variantClass} ${className}`}>{children}</Link>
  );
};

export const BackButton = () => (
  <LinkButton to="../" variant="secondary">Back</LinkButton>
);

export const NewNoteButton = () => (
  <LinkButton to="/notes/new" variant="primary">+</LinkButton>
);

export const EditNoteButton = ({ 
  id, 
  children = 'Edit'
}: EditNoteButtonProps) => {
  
  return (
    <LinkButton to={`/notes/${id}`} className={`note-link`}>
      {children}
    </LinkButton>
  );
};

// export const CreateNoteButton = ({
//   action = 'submit'
// }: CreateNoteButtonProps) => {
  
//   return (
//     <LinkButton to="../" variant="secondary">Criar Nota</LinkButton>
//   )
// };