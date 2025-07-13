import React, { useState } from 'react';
import './Modal.css';

function CreateUserModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, password, role });
    setName('');
    setPassword('');
    setRole('user');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Create New User</h3>
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="modal-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserModal;
