
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import OwnerPage from './OwnerPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { Navbar } from 'react-bootstrap';


function AppRouts() {
  
  let [session, setSession] = useState(null);

  const handleLogout = () => {
    setSession(null);
  };

  return (
    <Router>
      <Navbar session={session} onLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route 
            path="/user" 
            element={<UserPage session={session} />} 
          />
          <Route 
            path="/owner" 
            element={<OwnerPage session={session} />} 
          />
          <Route 
            path="/login" 
            element={<LoginPage setSession={setSession} />} 
          />
          <Route 
            path="/signup" 
            element={<SignupPage setSession={setSession} />} 
          />
          <Route path="*" element={<LoginPage setSession={setSession} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouts;
