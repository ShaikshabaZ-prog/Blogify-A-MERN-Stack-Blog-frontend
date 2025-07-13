import { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css';
import EditBlogModal from '../components/EditBlogModal';

function UserDashboard({ user, onLogout }) {
  const [blogs, setBlogs] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '', tags: '' });
  const [editingBlog, setEditingBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUserBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/user/${user.id}`);
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, );

  const handleCreate = async () => {
    const { title, content, category, tags } = newPost;
    if (!title || !content) return alert('Title and content are required');

    try {
      const res = await axios.post('http://localhost:5000/api/blogs', {
        title,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
      });

      setBlogs([res.data, ...blogs]);
      setNewPost({ title: '', content: '', category: '', tags: '' });
    } catch (err) {
      console.error('Create error:', err);
      alert('Failed to create blog');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete blog');
    }
  };

  const handleUpdateBlog = async (updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/blogs/${updatedData._id}`, updatedData);
      setBlogs(blogs.map(b => (b._id === updatedData._id ? res.data : b)));
      setShowModal(false);
      setEditingBlog(null);
    } catch (err) {
      console.error('Edit error:', err);
      alert('Failed to update blog');
    }
  };

  return (
    <div className="user-dashboard-wrapper">
      <aside className="user-sidebar">
        <h2>{user.name}'s Dashboard</h2>
        <ul>
          <li onClick={onLogout}>Logout</li>
        </ul>
      </aside>

      <main className="user-dashboard-content">
        <h1>My Blogs</h1>

        <div className="new-post">
          <h3>Create New Blog</h3>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={newPost.tags}
            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
          />
          <button onClick={handleCreate}>Publish</button>
        </div>

        <div className="post-list">
          {blogs.length === 0 ? (
            <p>You haven't created any blogs yet.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="post-item">
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p><strong>Category:</strong> {blog.category || 'Uncategorized'}</p>
                <p><strong>Tags:</strong> {blog.tags?.join(', ')}</p>
                <div className="actions">
                  <button onClick={() => {
                    setEditingBlog(blog);
                    setShowModal(true);
                  }}>Edit</button>
                  <button onClick={() => handleDelete(blog._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        <EditBlogModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleUpdateBlog}
          blog={editingBlog}
        />
      </main>
    </div>
  );
}

export default UserDashboard;
