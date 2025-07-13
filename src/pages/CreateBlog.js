import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';

function CreateBlog({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://blogify-yours-blog.onrender.com/api/blogs', {
        title,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        author: user.id
      });
      alert('Blog post created!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to create blog');
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="8"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreateBlog;
