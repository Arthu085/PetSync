import React, { useState, useEffect } from "react";
import NavigationBar from "../../NavigationBar/NavigationBar";
import './CrudCliente.css';

const CrudCliente = () => {
  
  const [clientes, setClientes] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [nome_cliente, setNomeCliente] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [formVisibleDelete, setFormVisibleDelete] = useState(false);
  const [clienteExcluirId, setClienteExcluirId] = useState(null);
  const [formVisibleEdit, setFormVisibleEdit] = useState(false);
  const [clienteId, setClienteId] = useState(null);
  const [editableFields, setEditableFields] = useState({
    nome_cliente: false,
    email: false,
    telefone: false,
    cpf: false,
    endereco: false,
  });

  const formatTelefone = (value) => {
    value = value.replace(/\D/g, '');  // Remove caracteres não numéricos
    if (value.length > 11) value = value.substring(0, 11);  // Limita a 11 dígitos
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    return value;
  };

  const formatCpf = (value) => {
    value = value.replace(/\D/g, '');  // Remove caracteres não numéricos
    if (value.length > 11) value = value.substring(0, 11);  // Limita a 11 dígitos
    if (value.length <= 11) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }
    return value;
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clientes');
      const data = await response.json();
      if (response.ok) {
        setClientes(data.data);
      } else {
        alert(`Erro ao buscar clientes: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      alert('Erro ao buscar clientes');
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const toggleForm = () => {
    setFormVisible(!formVisible)
    if (!formVisible) {
      setNomeCliente('');
      setEmail('');
      setTelefone('');
      setEndereco('');
      setCpf('');
    }
  };
  const toggleFormDelete = () => setFormVisibleDelete(!formVisibleDelete);
  const toggleFormEdit = () => setFormVisibleEdit(!formVisibleEdit);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clienteData = { nome_cliente, email, telefone, endereco, cpf };
    try {
      const response = await fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Cliente adicionado com sucesso!');
        fetchClientes();
        setFormVisible(false);
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      alert('Erro ao adicionar cliente');
    }
  };

  const handleDeleteClick = (id_cliente) => {
    setClienteExcluirId(id_cliente);
    setFormVisibleDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/clientes/${clienteExcluirId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        alert('Cliente deletado com sucesso!');
        fetchClientes();
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      alert('Erro ao deletar cliente');
    }
    setFormVisibleDelete(false);
  };

  const handleCancelDelete = () => setFormVisibleDelete(false);

  const handleEditClick = (id_cliente) => {
    setClienteId(id_cliente); // Definindo o id do cliente a ser editado
    const cliente = clientes.find(c => c.id_cliente === id_cliente);
    setNomeCliente(cliente.nome_cliente);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setEndereco(cliente.endereco);
    setCpf(cliente.cpf);
    setEditableFields({
      nome_cliente: false,
      email: false,
      telefone: false,
      endereco: false,
      cpf: false,
    });
    setFormVisibleEdit(true); // Tornando o formulário de edição visível
  };
  

  const handleFieldChange = (field) => {
    setEditableFields((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    const clienteData = {};
    if (editableFields.nome_cliente && nome_cliente) clienteData.nome_cliente = nome_cliente;
    if (editableFields.email && email) clienteData.email = email;
    if (editableFields.telefone && telefone) clienteData.telefone = telefone;
    if (editableFields.endereco && endereco) clienteData.endereco = endereco;
    if (editableFields.cpf && cpf) clienteData.cpf = cpf;
  
    // Verifique se há dados para enviar antes de tentar editar
    if (Object.keys(clienteData).length === 0) {
      alert('Nenhum campo foi modificado.');
      return;
    }
  
    // Verifique se o clienteId está presente
    if (!clienteId) {
      alert('ID do cliente não encontrado.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/clientes/${clienteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Cliente atualizado com sucesso!');
        fetchClientes(); // Atualiza a lista de clientes
      } else {
        alert(`Erro ao atualizar cliente: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente');
    }
    setFormVisibleEdit(false);
  };
  
  

  return (
    <div>
      <NavigationBar />
      <div className="container-cliente">
        <div className="h1-button">
          <h1 className="h1-cliente">Listagem de Clientes</h1>
          <button id="adicionar-cliente" onClick={toggleForm}>Adicionar Cliente</button>
        </div>
        <div className="clientes-list">
          {clientes.length > 0 ? (
            <div>
              <div className="cliente-cabecario">
                <span>Nome do Cliente</span>
                <span>Email</span>
                <span>Telefone</span>
                <span>Endereço</span>
                <span>CPF</span>
              </div>
              <ul className="ul-cliente">
                {clientes.map((cliente) => (
                  <li className="li-cliente" key={cliente.id_cliente}>
                    <div className="dados-cliente">
                      <span>{cliente.nome_cliente}</span>
                      <span>{cliente.email}</span>
                      <span>{cliente.telefone}</span>
                      <span>{cliente.endereco}</span>
                      <span>{cliente.cpf}</span>
                    </div>
                    <div className="action-buttons">
                      <button id="edit-cliente" onClick={() => handleEditClick(cliente.id_cliente)}>Editar</button>
                      <button id="delete-cliente" onClick={() => handleDeleteClick(cliente.id_cliente)}>Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-cliente">Nenhum cliente encontrado.</p>
          )}
        </div>

        {formVisible && (
          <div className="form-container">
            <div className="form-overlay" onClick={toggleForm}></div>
            <div className="form-content">
              <h2>Adicionar Novo Cliente</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome do Cliente" value={nome_cliente} onChange={(e) => setNomeCliente(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(formatTelefone(e.target.value))} maxLength="15" required />
                <textarea placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required></textarea>
                <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} maxLength="14" required />
                <button type="submit">Adicionar</button>
              </form>
            </div>
          </div>
        )}

        {formVisibleDelete && (
          <div className="form-container">
            <div className="form-overlay" onClick={toggleFormDelete}></div>
            <div className="form-content-delete">
              <h2>Excluir Cliente</h2>
              <p>Tem certeza que deseja excluir este cliente?</p>
              <div className="answer-buttons">
                <button onClick={handleConfirmDelete}>Confirmar</button>
                <button onClick={handleCancelDelete}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {formVisibleEdit && (
          <div className="form-container">
            <div className="form-overlay" onClick={toggleFormEdit}></div>
            <div className="form-content-edit">
              <h2>Editar Cliente</h2>
              <form onSubmit={handleEditSubmit}>
                <div>
                  <input type="checkbox" checked={editableFields.nome_cliente} onChange={() => handleFieldChange('nome_cliente')} />
                  <label>Editar Nome</label>
                </div>
                {editableFields.nome_cliente && <input type="text" placeholder="Nome do Cliente" value={nome_cliente} onChange={(e) => setNomeCliente(e.target.value)} />}
                
                <div>
                  <input type="checkbox" checked={editableFields.email} onChange={() => handleFieldChange('email')} />
                  <label>Editar Email</label>
                </div>
                {editableFields.email && <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />}
                
                <div>
                  <input type="checkbox" checked={editableFields.telefone} onChange={() => handleFieldChange('telefone')} />
                  <label>Editar Telefone</label>
                </div>
                {editableFields.telefone && <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(formatTelefone(e.target.value))} maxLength="15" />}
                
                <div>
                  <input type="checkbox" checked={editableFields.endereco} onChange={() => handleFieldChange('endereco')} />
                  <label>Editar Endereço</label>
                </div>
                {editableFields.endereco && <textarea placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />}
                
                <div>
                  <input type="checkbox" checked={editableFields.cpf} onChange={() => handleFieldChange('cpf')} />
                  <label>Editar CPF</label>
                </div>
                {editableFields.cpf && <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} maxLength="14" />}

                <div className="button-save-edit">
                  <button type="submit">Salvar</button>
                  </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrudCliente;
