import './Dashboard.css';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { useEffect, useState } from 'react';


const Dashboard = () => {

  const [clienteNumber, setClienteNumber] = useState(0);
  const [animalNumber, setAnimalNumber] = useState(0);
  const [usuarioNumber, setUsuarioNumber] = useState(0);
  const [agendamentoNumber, setAgendamentoNumber] = useState(0);
  const [agendamentos, setAgendamentos] = useState([]);
  const [agendamentoId, setAgendamentoId] = useState(null);
  const [statusAgendamento, setStatusAgendamento] = useState('');
  const [formVisibleEditStatus, setFormVisibleEditStatus] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('geral');

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

  const fetchAgendamentoNumber = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/agendamento-number');
      const data = await response.json();

      if (response.ok && data.data.length > 0 && data.data[0].count !== undefined) {
        setAgendamentoNumber(data.data[0].count);
      } else {
        setAgendamentoNumber(0);
      } 
    } catch (error) {
      console.error('Erro ao buscar número de agendamentos', error);
      setAgendamentoNumber(0); 
      alert('Erro ao buscar número de agendamento');
    }
  };

  const fetchAgendamentos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/agendamentos');
      const data = await response.json();

      if (response.ok) {
        setAgendamentos(data.data);
      } else {
        setAgendamentos(null);
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos', error);
      setAgendamentoNumber(0); 
      alert('Erro ao buscar agendamentos');      
    }
  }
    
  useEffect(() => {
    fetchClienteNumber();
    fetchAnimalNumber();
    fetchUsuarioNumber();
    fetchAgendamentoNumber();
    fetchAgendamentos();
  }, []);

  const formatarDataHora = (data) => {
    const date = new Date(data);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleFormEditStatus = () => {
    setFormVisibleEditStatus(!formVisibleEditStatus)
  };

  const handleSelectStatus = (event) => {
    setStatusAgendamento(event.target.value);
  };

  const handleFilterStatus = (event) => {
    setFiltroStatus(event.target.value)
  };

  const agendamentosFiltrados = filtroStatus === 'geral'
  ? agendamentos
  : agendamentos.filter((agendamento) => agendamento.id_status.toString() === filtroStatus);


  const handleEditStatus = (id_agendamento) => {
    const agendamento = agendamentos.find((c) => c.id_agendamento === id_agendamento);
    if (!agendamento) {
        alert('Agendamento não encontrado.');
        return;
    }
    setAgendamentoId(id_agendamento);
    setStatusAgendamento(agendamento.id_status || ''); // Preenche o status atual
    setFormVisibleEditStatus(true); // Mostra o formulário
};

  const handleEditStatusSubmit = async (e) => {
    e.preventDefault();

    const agendamentoData = {
      id_status: statusAgendamento,
    };

    if (Object.keys(agendamentoData).length === 0) {
      alert('Nenhum campo foi modificado.');
      return;
    }

    if(!agendamentoId) {
      alert('ID do agendamento não encontrado.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/agendamentos/${agendamentoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agendamentoData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Status atualizado com sucesso!');
        fetchAgendamentos();
      } else {
        alert(`Erro ao atualizar status: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    }
    setFormVisibleEditStatus(false);
  };
  
  return (
    <div>
        <NavigationBar/>
        <div className='container-informacoes'>
          <div className='agendamentos'>
            <h2>Agendamentos Adicionados</h2>
            <h3>Filtrar Agendamentos</h3>
          <select className='input-style' value={filtroStatus} onChange={handleFilterStatus}>
            <option value="geral">Todos</option>
            <option value="1">Agendado</option>
            <option value="3">Cancelado</option>
            <option value="4">Pendente</option>
            <option value="5">Em andamento</option>
            <option value="6">Concluído</option>
          </select>
            {agendamentosFiltrados && agendamentosFiltrados.length > 0 ? (
            <ul>
              {agendamentosFiltrados.map((agendamento, index) => (
                <li key={index}>
                  <p><strong>Cliente:</strong> {agendamento.nome_cliente}</p>
                  <p><strong>Animal:</strong> {agendamento.nome_animal} ({agendamento.especie})</p>
                  <p><strong>Serviço:</strong> {agendamento.descricao_servico}</p>
                  <p><strong>Status:</strong> {agendamento.descricao_status}</p>
                  <p><strong>Data e Hora:</strong> {formatarDataHora(agendamento.data_hora)}</p>
                  <p><strong>Observações:</strong> {agendamento.observacoes}</p>
                  <button id='editar-status' onClick={() => handleEditStatus(agendamento.id_agendamento)}>Alterar Status</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Sem agendamentos encontrados...</p>
          )}
          </div>
          <div className='informacoes-gerais'>
            <h2>Informações Gerais</h2>
            <p>Quantidade de clientes cadastrados: {clienteNumber}</p>
            <p>Quantidade de animais cadastrados: {animalNumber}</p>
            <p>Quantidade de usuários cadastrados: {usuarioNumber}</p>
            <p>Quantidade de agendamentos cadastrados: {agendamentoNumber}</p>
          </div>
        </div>

        {formVisibleEditStatus && (
          <div className="form-container">
            <div className="form-overlay" onClick={toggleFormEditStatus}></div>
            <div className="form-content">
              <h2>Alterar Status do Agendamento</h2>
              <form onSubmit={handleEditStatusSubmit}>
              <select className='input-style' value={statusAgendamento} onChange={handleSelectStatus} required>
                        <option value="" disabled>
                            Selecione o Status
                        </option>
                        <option value="1">Agendado</option>
                        <option value="3">Cancelado</option>
                        <option value="4">Pendente</option>
                        <option value="5">Em andamento</option>
                        <option value="6">Concluído</option>
                    </select>
                    <button type='submit'>Alterar</button>                
              </form>
            </div>
          </div>
        )}
    </div>
  )
}

export default Dashboard