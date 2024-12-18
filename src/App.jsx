import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import CrudCliente from './components/pages/CrudCliente/CrudCliente';
import CrudAnimal from './components/pages/CrudAnimal/CrudAnimal';
import CrudUsuario from './components/pages/CrudUsuario/CrudUsuario';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CrudAgendamento from './components/pages/CrudAgendamento/CrudAgendamento';

const App = () => {
  return (
    <Router>
      <BodyClassManager>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cliente" element={<CrudCliente />} />
          <Route path='/animal' element={<CrudAnimal />} />
          <Route path='/usuario' element={
            <ProtectedRoute requiredAccess={1}>
              <CrudUsuario />
            </ProtectedRoute>
          }/>
          <Route path='/agendamento' element={<CrudAgendamento />} />
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
    } else if (location.pathname === '/cliente') {
      document.body.className = 'cliente-page';
    } else if (location.pathname === '/animal') {
      document.body.className = 'animal-page'
    } else if (location.pathname === '/usuario') {
      document.body.className = 'usuario-page'
    } else if (location.pathname === '/agendamento') {
      document.body.className = 'agendamento-page'
    }
  }, [location]);

  return children;
};

export default App;
