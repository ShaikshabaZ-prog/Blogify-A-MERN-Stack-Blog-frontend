import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlogDetail.css';

function BlogDetail({ user }) {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogRes = await axios.get(`https://blogify-yours-blog.onrender.com/api/blogs/${id}`);
                const commentRes = await axios.get(`https://blogify-yours-blog.onrender.com/api/comments/${id}`);
                setBlog(blogRes.data);
                setComments(commentRes.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching blog:', err);
            } finally {
        setLoading(false);
      }
        };
        fetchData();
    }, [id]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            await axios.post(`https://blogify-yours-blog.onrender.com/api/comments/${id}`, {
                content: newComment,
                user: user.name
            });
            setNewComment('');
            const res = await axios.get(`https://blogify-yours-blog.onrender.com/api/comments/${id}`);
            setComments(res.data);
        } catch (err) {
            alert('Failed to add comment');
        }
    };

    return (
        <>
         {loading ? (
        <div className="loader-container">
        <div className="loader"></div>
        <p>Loading blogs...</p>
        </div>
      ) :
        <div className="blog-detail-container">
            <h2>Title:{blog.title}</h2>
            <p className="meta">By {blog.author?.name} • {new Date(blog.createdAt).toLocaleDateString()}</p>
            <div className="content">content:{blog.content}</div>

            <h3>Comments</h3>
            {user ? (
                <div className="comment-form">
                    <textarea
                        rows="3"
                        placeholder="Write your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleAddComment}>Submit</button>
                </div>
            ) : (
                <p>Login to post a comment</p>
            )}

            <ul className="comment-list">
                {comments.map((c) => (
                    <li key={c._id}>
                        <strong>{c.user}</strong>: {c.content}
                    </li>
                ))}
            </ul>
        </div>
}
        </>
    );
}

export default BlogDetail;
