import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

import EditUserModal from '../components/EditUserModal';
import EditBlogModal from '../components/EditBlogModal';
import CreateUserModal from '../components/CreateUserModal';
import CreateBlogModal from '../components/CreateBlogModal';

function Admin({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [editUser, setEditUser] = useState(null);
  const [editBlog, setEditBlog] = useState(null);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createBlogOpen, setCreateBlogOpen] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [searchBlog, setSearchBlog] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersRes = await axios.get('http://localhost:5000/api/users');
    const blogsRes = await axios.get('http://localhost:5000/api/blogs');
    setUsers(usersRes.data);
    setBlogs(blogsRes.data);
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchUser.toLowerCase())
  );
  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(searchBlog.toLowerCase()) ||
    b.category.toLowerCase().includes(searchBlog.toLowerCase())
  );
  const paginatedUsers = filteredUsers.slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice((blogPage - 1) * itemsPerPage, blogPage * itemsPerPage);

  const handleDeleteUser = async (id) => {
    if (window.confirm('Delete this user?')) {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchData();
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Delete this blog?')) {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchData();
    }
  };

  const handleEditUser = async (data) => {
    await axios.put(`http://localhost:5000/api/users/${data._id}`, data);
    setEditUser(null);
    fetchData();
  };

  const handleEditBlog = async (data) => {
    await axios.put(`http://localhost:5000/api/blogs/${data._id}`, {
      ...data,
      role: 'admin',
      userId: user.id,
    });
    setEditBlog(null);
    fetchData();
  };

  const handleCreateUser = async (data) => {
    await axios.post('http://localhost:5000/api/register', data);
    setCreateUserOpen(false);
    fetchData();
  };

  const handleCreateBlog = async (data) => {
    await axios.post('http://localhost:5000/api/blogs', {
      ...data,
      author: user.id,
      role: 'admin',
      userId: user.id
    });
    setCreateBlogOpen(false);
    fetchData();
  };

  return (
    <div className="admin-wrapper">
      <aside className="sidebar">
        <h2>Blogify Admin</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li onClick={onLogout}>Logout</li>
        </ul>
      </aside>
      <main className="admin-main">
        <h1>Dashboard</h1>
        <section>
          <h3>All Users</h3>
          <input
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search users..."
          />
          <button onClick={() => setCreateUserOpen(true)}>+ New User</button>
          <table>
            <thead>
              <tr><th>Name</th><th>Role</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paginatedUsers.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => setEditUser(u)}>Edit</button>
                    <button onClick={() => handleDeleteUser(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button disabled={userPage === 1} onClick={() => setUserPage(userPage - 1)}>Previous</button>
            <span>Page {userPage}</span>
            <button disabled={userPage * itemsPerPage >= filteredUsers.length} onClick={() => setUserPage(userPage + 1)}>Next</button>
          </div>
        </section>

        <section>
          <h3>All Blogs</h3>
          <input
            value={searchBlog}
            onChange={(e) => setSearchBlog(e.target.value)}
            placeholder="Search blogs..."
          />
          <button onClick={() => setCreateBlogOpen(true)}>+ New Blog</button>
          <table>
            <thead>
              <tr><th>Title</th><th>Author</th><th>Category</th><th>Content</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paginatedBlogs.map(b => (
                <tr key={b._id}>
                  <td>{b.title}</td>
                  <td>{b.author?.name || 'N/A'}</td>
                  <td>{b.category}</td>
                  <td>{b.content}</td>
                  <td>
                    <button onClick={() => setEditBlog(b)}>Edit</button>
                    <button onClick={() => handleDeleteBlog(b._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button disabled={blogPage === 1} onClick={() => setBlogPage(blogPage - 1)}>Previous</button>
            <span>Page {blogPage}</span>
            <button disabled={blogPage * itemsPerPage >= filteredBlogs.length} onClick={() => setBlogPage(blogPage + 1)}>Next</button>
          </div>
        </section>
      </main>
      <EditUserModal isOpen={!!editUser} user={editUser} onClose={() => setEditUser(null)} onSave={handleEditUser} />
      <EditBlogModal isOpen={!!editBlog} blog={editBlog} onClose={() => setEditBlog(null)} onSave={handleEditBlog} />
      <CreateUserModal isOpen={createUserOpen} onClose={() => setCreateUserOpen(false)} onCreate={handleCreateUser} />
      <CreateBlogModal isOpen={createBlogOpen} onClose={() => setCreateBlogOpen(false)} onCreate={handleCreateBlog} />
    </div>
  );
}

export default Admin;
