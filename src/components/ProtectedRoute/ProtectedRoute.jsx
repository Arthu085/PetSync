import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredAccess }) => {
    const accessType = Number(localStorage.getItem('accessType')); // Garantindo que é um número
  
    if (!accessType || accessType < requiredAccess) {
      return <Navigate to="/dashboard" replace />; // Redireciona para o dashboard se não tiver acesso suficiente
    }
  
    return children; // Se tiver acesso, retorna o conteúdo protegido
  };
  
export default ProtectedRoute;
