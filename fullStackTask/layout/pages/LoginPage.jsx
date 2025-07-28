import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setSession }) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [role, setRole] = useState('User'); // 'User' or 'Owner'
  let [error, setError] = useState('');
  const navigate = useNavigate();

  // Dummy credentials for demonstration
  const dummyUsers = [
    { email: 'john@example.com', password: 'User@1234', role: 'User', name: 'John Doe' },
    { email: 'jane@store.com', password: 'Owner@123', role: 'Owner', name: 'Jane StoreOwner' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const found = dummyUsers.find(u => u.email === email && u.password === password && u.role === role);
    if (found) {
      setSession({ role: role, user: { ...found } });
      if (role === 'User') navigate('/user');
      if (role === 'Owner') navigate('/owner');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block">Role:</label>
          <select
            className="border p-2 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>User</option>
            <option>Owner</option>
          </select>
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
          <label className="block">Password:</label>
          <input 
            type="password" 
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
