import React, { useState, useEffect } from 'react';
import './Modal.css';

function EditUserModal({ user, isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, name, role });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit User</h3>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button onClick={onClose} type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
