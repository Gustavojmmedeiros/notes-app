import React, { useState } from 'react';
import { BackButton } from './Button';

interface NoteFormProps {
  initialData?: {
    title: string;
    content: string;
    tags: string[];
  } | null;

  onSubmit: (data: { title: string; content: string; tags: string[] }) => void;

  submitLabel: string;
}

const NoteForm = ({ initialData, onSubmit, submitLabel }: NoteFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

    onSubmit({ title, content, tags: tagsArray});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input 
          style={{ marginLeft: '4px', marginBottom: '6px' }}
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
      </div>
      <div>
        <label>Conteúdo</label>
        <textarea 
          style={{ marginLeft: '4px', marginBottom: '6px' }}
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required
        />
      </div>
      <div>
        <label>Tags</label>
        <input 
          style={{ marginLeft: '4px', marginBottom: '6px' }}
          type="text" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
          placeholder="ex: trabalho, projeto, urgente"
        />
      </div>
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default NoteForm;