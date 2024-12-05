import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Verifique se 'email' e 'password' estão corretos
      });
  
      const data = await response.json();
  
      if (data.success) {
        setMessage('Login bem-sucedido!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Erro ao conectar ao servidor!');
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Bem-vindo</h2>
        <label htmlFor="email">Digite seu E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@exemplo.com"
          required
        />
        <label htmlFor="password">Digite sua senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
        />
        <button type="submit">Entrar</button>
        {message && <p>{message}</p>} {/* Exibe a mensagem de erro ou sucesso */}
      </form>
    </div>
  );
};

export default Login;
