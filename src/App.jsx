import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <BodyClassManager>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BodyClassManager>
    </Router>
  );
};

// Gerenciador da classe do body
const BodyClassManager = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.className = 'login-page';
    } else if (location.pathname === '/dashboard') {
      document.body.className = 'dashboard-page';
    }
  }, [location]);

  return children;
};

export default App;
