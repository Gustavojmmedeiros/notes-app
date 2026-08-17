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
}

export const LinkButton = ({ to, children, variant = 'primary', className = '' }: LinkButtonProps) => {

  const variantClass = `link-button-${variant}`;

  return (
    <Link to={to} className={`link-button ${variantClass} ${className}`}>{children}</Link>
  );
};

export const BackButton = () => (
  <LinkButton to="../" variant="secondary">Back</LinkButton>
);

export const NewNoteButton = () => (
  <LinkButton to="/notes/new">+</LinkButton>
);

export const EditNote = ({ id, variant = 'secondary', children = 'Edit' }: EditNoteButtonProps) => {
  
  return (
    <LinkButton to={`/notes/${id}`} variant={variant}>{children}</LinkButton>
  );
};