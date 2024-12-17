import './Dashboard.css';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { useEffect, useState } from 'react';


const Dashboard = () => {

  const [clienteNumber, setClienteNumber] = useState(0);
  const [animalNumber, setAnimalNumber] = useState(0);
  const [usuarioNumber, setUsuarioNumber] = useState(0);

  const fetchClienteNumber = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cliente-number');
      const data = await response.json();
  
      if (response.ok && data.data.length > 0 && data.data[0].count !== undefined) {
        setClienteNumber(data.data[0].count);
      } else {
        setClienteNumber(0); 
      }
    } catch (error) {
      console.error('Erro ao buscar número de clientes', error);
      setClienteNumber(0); 
      alert('Erro ao buscar número de clientes');
    }
  };

  const fetchAnimalNumber = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/animal-number');
      const data = await response.json();
  
      if (response.ok && data.data.length > 0 && data.data[0].count !== undefined) {
        setAnimalNumber(data.data[0].count);
      } else {
        setAnimalNumber(0); 
      }
    } catch (error) {
      console.error('Erro ao buscar número de animais', error);
      setAnimalNumber(0); 
      alert('Erro ao buscar número de animais');
    }
  };

  const fetchUsuarioNumber = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/usuario-number');
      const data = await response.json();
  
      if (response.ok && data.data.length > 0 && data.data[0].count !== undefined) {
        setUsuarioNumber(data.data[0].count);
      } else {
        setUsuarioNumber(0); 
      }
    } catch (error) {
      console.error('Erro ao buscar número de usuários', error);
      setUsuarioNumber(0); 
      alert('Erro ao buscar número de usuários');
    }
  };
    
  useEffect(() => {
    fetchClienteNumber();
    fetchAnimalNumber();
    fetchUsuarioNumber();
  }, []);

  return (
    <div>
        <NavigationBar/>
        <div className='container-informacoes'>
          <div className='informacoes-gerais'>
            <h2>Informações Gerais</h2>
            <p>Quantidade de clientes cadastrados: {clienteNumber}</p>
            <p>Quantidade de animais cadastrados: {animalNumber}</p>
            <p>Quantidade de usuários cadatrados: {usuarioNumber}</p>
          </div>
        </div>
    </div>
  )
}

export default Dashboard