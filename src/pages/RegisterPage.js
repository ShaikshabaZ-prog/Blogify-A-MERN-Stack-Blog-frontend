import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import './LoginPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://blogify-yours-blog.onrender.com/api/register', {
        name,
        password,
        role,
      });
      alert('Registration successful! You can now log in.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Register for Blogify</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
