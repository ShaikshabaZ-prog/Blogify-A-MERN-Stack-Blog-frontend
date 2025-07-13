import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title?.toLowerCase().includes(search.toLowerCase()) ||
    blog.category?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="home-container">
      <div className="hero-banner">
       
  <h2>Start Your Blogging Journey</h2>
  <p>Write. Read. Connect. Inspire.</p>
  <Link to="/register" className="read-more-txt">Join Blogify</Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title or category"
          className="search-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <button className="search-button">Search</button>
      </div>

      <div className="blog-grid">
        {paginatedBlogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <h3>Title:{blog.title || 'Untitled Blog'}</h3>
            <p className="title">Category:{blog.category || 'Uncategorized'}</p>
            <p className="snippet">
              snippet:{blog.content ? blog.content.substring(0, 80) + '...' : 'No content available.'}
            </p>
            <p className="meta">
              author:{blog.author?.name || 'Anonymous'} •{' '}
              {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
            </p>
            <div className="read-more-wrapper">
            <Link to={`/blog/${blog._id}`} className="read-more">Read More</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <h4>Contact Info</h4>
            <p>contact@blogify.com</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p><li>Insta:@BlogifyMedia</li></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
