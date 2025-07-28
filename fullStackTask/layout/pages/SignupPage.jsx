import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage({ setSession }) {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [address, setAddress] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const hasUpperCase = (str) => /[A-Z]/.test(str);
  const hasSpecialChar = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (name.length < 20 || name.length > 60) { setError('Name must be 20-60 characters.'); return; }
    if (address.length > 400) { setError('Address must be < 400 characters.'); return; }
    if (!isValidEmail(email)) { setError('Invalid email format.'); return; }
    if (password.length < 8 || password.length > 16 || !hasUpperCase(password) || !hasSpecialChar(password)) {
      setError('Password must be 8-16 chars, include uppercase and special character.');
      return;
    }
    setError('');
    
    const newUser = { id: Date.now(), name, email, address, password, role: 'User' };
    
    setSession({ role: 'User', user: newUser });
    navigate('/user');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-2xl mb-4">Sign Up (Normal User)</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name, Email, Address, Password fields (similar to AddUserForm) */}
        
      </form>
    </div>
  );
}

export default SignupPage;
