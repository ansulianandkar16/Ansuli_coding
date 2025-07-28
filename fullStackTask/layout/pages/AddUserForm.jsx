import React, { useState } from 'react';

function AddUserForm({ onAddUser }) {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [address, setAddress] = useState('');
  let [password, setPassword] = useState('');
  let [role, setRole] = useState('User');
  let [error, setError] = useState('');

  // Validation helper functions
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const hasUpperCase = (str) => /[A-Z]/.test(str);
  const hasSpecialChar = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (name.length < 20 || name.length > 60) {
      setError('Name must be 20-60 characters.');
      return;
    }
    if (address.length > 400) {
      setError('Address must be less than 400 characters.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Invalid email format.');
      return;
    }
    if (password.length < 8 || password.length > 16 || !hasUpperCase(password) || !hasSpecialChar(password)) {
      setError('Password must be 8-16 chars, include uppercase and special character.');
      return;
    }
    setError('');
    onAddUser({ name, email, address, password, role });
    // Clear form
    setName(''); setEmail(''); setAddress(''); setPassword(''); setRole('User');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label className="block">Name:</label>
        <input 
          className="border p-2 w-full" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div>
        <label className="block">Email:</label>
        <input 
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <label className="block">Address:</label>
        <textarea 
          className="border p-2 w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)} 
        />
      </div>
      <div>
        <label className="block">Password:</label>
        <input 
          type="password" 
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <div>
        <label className="block">Role:</label>
        <select 
          className="border p-2 w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Admin</option>
          <option>User</option>
          <option>Owner</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add User
      </button>
    </form>
  );
}

export default AddUserForm;
