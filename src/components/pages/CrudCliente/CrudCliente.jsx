import React, { useState, useEffect } from "react";
import NavigationBar from "../../NavigationBar/NavigationBar";
import './CrudCliente.css';

const CrudCliente = () => {
  const [clientes, setClientes] = useState([]); // Armazenar clientes
  const [formVisible, setFormVisible] = useState(false);
  const [nome_cliente, setNomeCliente] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');

  // Função para formatar o telefone
  const formatTelefone = (value) => {
    // Remove tudo o que não for número
    value = value.replace(/\D/g, '');
    // Adiciona os parênteses e o traço no formato (XX) XXXXX-XXXX
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    return value;
  };

  // Função para formatar o CPF
  const formatCpf = (value) => {
    // Remove tudo o que não for número
    value = value.replace(/\D/g, '');
    // Adiciona os pontos e traço no formato XXX.XXX.XXX-XX
    if (value.length <= 11) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }
    return value;
  };

  // Função para buscar os clientes
  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clientes');
      const data = await response.json();
      if (response.ok) {
        setClientes(data.data); // Armazenar os dados dos clientes
      } else {
        alert(`Erro ao buscar clientes: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      alert('Erro ao buscar clientes');
    }
  };

  useEffect(() => {
    fetchClientes(); // Chamar a função para buscar os clientes quando o componente for montado
  }, []);

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clienteData = {
      nome_cliente,
      email,
      telefone,
      endereco,
      cpf,
    };

    try {
      const response = await fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cliente adicionado com sucesso!');
        fetchClientes(); // Recarregar a lista de clientes após adicionar um novo
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      alert('Erro ao adicionar cliente');
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container-cliente">
        <div className="h1-button">
          <h1 className="h1-cliente">Listagem de Clientes</h1>
          <button id="adicionar-cliente" onClick={toggleForm}>Adicionar Cliente</button>
        </div>

        {/* Exibir a lista de clientes */}
        <div className="clientes-list">
          {clientes.length > 0 ? (
            <ul>
              {clientes.map((cliente) => (
                <li key={cliente.id_cliente}>
                  {cliente.nome_cliente} - {cliente.email} - {cliente.telefone} - {cliente.endereco} - {cliente.cpf}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </div>

        {/* Formulário de adição de cliente */}
        {formVisible && (
          <div className="form-container">
            <div className="form-overlay" onClick={toggleForm}></div>
            <div className="form-content">
              <h2>Adicionar Novo Cliente</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Nome do Cliente"
                  value={nome_cliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                  maxLength="15"
                  required
                />
                <textarea
                  placeholder="Endereço"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                ></textarea>
                <input
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                  maxLength="14"
                />
                <button type="submit">Salvar</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrudCliente;
