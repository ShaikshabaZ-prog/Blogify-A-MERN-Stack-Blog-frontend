import React, { useState } from 'react';
import './Modal.css';

function CreateBlogModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, category,content });
    setTitle('');
    setCategory('');
    setContent('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Create New Blog</h3>
        <form onSubmit={handleSubmit}>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <input placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
          <div className="modal-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBlogModal;
