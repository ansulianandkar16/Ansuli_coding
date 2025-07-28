import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  // session = { role: 'Admin'|'User'|'Owner', ... } 
  let session = props.session;
  let setSession = props.setSession;

  // Logout handler clears the session
  let handleLogout = () => {
    setSession(null);
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="max-w-screen-md mx-auto flex justify-between items-center px-4">
        {/* Site title / logo */}
        <div className="font-bold text-xl">
          <Link to="/">MyApp</Link>
        </div>
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          {session && session.role === 'Admin' && (
            <li><Link to="/admin">Admin Panel</Link></li>
          )}
          {session && session.role === 'Owner' && (
            <li><Link to="/owner">Owner Portal</Link></li>
          )}
          {session && session.role === 'User' && (
            <li><Link to="/profile">Profile</Link></li>
          )}
          {!session && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
          {session && (
            <li>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
