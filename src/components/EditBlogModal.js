import React, { useState, useEffect } from 'react';
import './Modal.css';

function EditBlogModal({ blog, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setCategory(blog.category || '');
      setContent(blog.content || '');
    }
  }, [blog]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...blog, title, category, content });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Blog</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button onClick={onClose} type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBlogModal;
