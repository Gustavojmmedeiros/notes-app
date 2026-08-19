import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
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