import React, { useState } from 'react';
import { Tag } from '../types';
// import { CreateNoteButton } from './Button';

interface NoteFormProps {
  initialData?: {
    title: string;
    content: string;
    tags: Tag[];
  } | null;

  onSubmit: (data: { title: string; content: string; tags: Tag[] }) => void;

  submitLabel: string;
}

const NoteForm = ({ initialData, onSubmit, submitLabel }: NoteFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.map(t => t.label).join(', ') || ''
  );

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    // const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
    const tagsArray: Tag[] = tagsInput
                            .split(',')
                            .map(t => t.trim())
                            .filter(Boolean)
                            .map(label => ({ id: 0, label }));

    onSubmit({ title, content, tags: tagsArray });

  };

  return (
    <div className='div-NoteForm'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='noteForm-label'>Título</label>
          <input 
            // style={{ marginLeft: '4px', marginBottom: '6px' }}
            className='input-title'
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        <div>
          <label className='noteForm-label'>Conteúdo</label>
          <textarea 
            // style={{ marginLeft: '4px', marginBottom: '6px' }}
            className='textarea-content'
            value={content} 
            rows={5}
            onChange={(e) => setContent(e.target.value)} 
            required
          />
        </div>
        <div>
          <label className='noteForm-label'>Tags</label>
          <input 
            // style={{ marginLeft: '4px', marginBottom: '6px' }}
            className='input-tags'
            type="text" 
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)} 
            placeholder="ex: trabalho, projeto, urgente"
          />
        </div>
        <button type="submit">{submitLabel}</button>
        {/* <CreateNoteButton action='submit' /> */}
      </form>
    </div>
  );
};

export default NoteForm;