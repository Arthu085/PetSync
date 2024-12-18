import './CrudUsuario.css'
import '../CrudAnimal/CrudAnimal.css'
import NavigationBar from '../../NavigationBar/NavigationBar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CrudUsuario = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idAcesso, setIdAcesso] = useState('');
    const [formVisibleDelete, setFormVisibleDelete] = useState(false);
    const [usuarioExcluirId, setUsuarioExcluirId] = useState(null);
    const [formVisibleEdit, setFormVisibleEdit] = useState(false);
    const [usuarioId, setUsuarioId] = useState(null);
    const [editableFields, setEditableFields] = useState({
        email: false,
        senha: false,
        idAcesso: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
      const accessType = Number(localStorage.getItem('accessType'));
    
      if (accessType !== 1) {
        console.log('Acesso negado, redirecionando...');
        navigate('/');
      }
    }, [navigate]);
    
    const toggleForm = () => {
        setFormVisible(!formVisible)
        if (!formVisible) {
            setEmail('');
            setSenha('');
            setIdAcesso('');
        }
    }

    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/usuarios');
            const data = await response.json();

            if (response.ok) {
                setUsuarios(data.data)
            } else {
                alert(`Erro ao buscar usuários: ${data.message}`);
            }
        } catch(error) {
            console.error('Erro ao buscar usuários:', error);
            alert('Erro ao buscar usuários');            
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Garantir que idAcesso seja um número válido
      const IdAcessoInt = parseInt(idAcesso, 10);
      if (isNaN(IdAcessoInt)) {
        alert('Selecione um Tipo de Acesso válido.');
        return;
      }
    
      const usuarioData = { email, senha, id_acesso: IdAcessoInt };
    
      try {
        const response = await fetch('http://localhost:5000/api/auth/registrar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(usuarioData),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Usuário adicionado com sucesso!');
          fetchUsuarios();
          setFormVisible(false);
        } else {
          alert(`Erro: ${data.message}`);
        }
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        alert('Erro ao adicionar usuário.');
      }
    };
    
    const toggleFormDelete = () => {
        setFormVisibleDelete(!formVisibleDelete)
    }

    const handleDeleteClick = (id_usuario) => {
        setUsuarioExcluirId(id_usuario);
        setFormVisibleDelete(true);
    }

    const handleConfirmDelete = async () => {
      console.log('ID do usuário para deletar:', usuarioExcluirId); // Verifique se o ID está correto
      try {
          const response = await fetch(`http://localhost:5000/api/usuarios/${usuarioExcluirId}`, {
              method: 'DELETE',
          });
          const data = await response.json();
          if (response.ok) {
              alert('Usuário deletado com sucesso!');
              fetchUsuarios();
          } else {
              alert(`Erro ao deletar usuário: ${data.message}`);
          }
      } catch (error) {
          console.error('Erro ao deletar usuário:', error);
          alert(`Erro ao deletar usuário: ${error.message}`);
      }
      setFormVisibleDelete(false);
  };
  
  

    const handleCancelDelete = () => {
        setFormVisibleDelete(!formVisibleDelete);
    }

    const toggleFormEdit = () => {
        setFormVisibleEdit(!formVisibleEdit);
    }

    const handleEditClick = (id_usuario) => {
        setUsuarioId(id_usuario);
        const usuario = usuarios.find(c => c.id_usuario === id_usuario);
        setEmail(usuario.email);
        setSenha(usuario.senha);
        setIdAcesso(usuario.id_acesso);
        setEditableFields({
            email: false,
            senha: false,
            idAcesso: false,
        });
        setFormVisibleEdit(true);
    }

    const handleFieldChange = (field) => {
        setEditableFields((prevState) => ({
          ...prevState,
          [field]: !prevState[field]
        }));
      };    

      const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        const usuarioData = {};
        if (editableFields.email && email) usuarioData.email = email;
        if (editableFields.senha && senha) usuarioData.senha = senha;
        if (editableFields.idAcesso && idAcesso)  {
            // Convertendo idAcesso para número
            const IdAcessoInt = parseInt(idAcesso, 10);
            if (isNaN(IdAcessoInt)) {
                alert('Selecione um Tipo de Acesso válido.');
                return;
            }
            usuarioData.id_acesso = IdAcessoInt;
        }
    
        if (Object.keys(usuarioData).length === 0) {
            alert('Nenhum campo foi modificado.');
            return;
        }
    
        if (!usuarioId) {
            alert('ID do usuário não encontrado.');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/usuarios/${usuarioId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
                fetchUsuarios();
                setFormVisibleEdit(false);
            } else {
                alert(`Erro ao atualizar usuário: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário');
        }
        setFormVisibleEdit(false);
    };
      
    const handleIdAcessoChange = (event) => {
      setIdAcesso(event.target.value);
    };     

  return (
    <div>
        <NavigationBar/>
        <div className='container-animal'>
            <div className='h1-animais'>
                <h1>Listagem de Usuário</h1>
                <button id='adicionar-usuario' onClick={toggleForm}>Adicionar usuário</button>
            </div>
            <div className="usuarios-list">
          {usuarios.length > 0 ? (
            <div>
              <div className="usuarios-cabecario">
                <span>Email</span>
                <span>Senha</span>
                <span>Tipo de Acesso</span>
              </div>
              <ul className="ul-usuario">
                {usuarios.map((usuarios) => (
                  <li className="li-usuario" key={usuarios.id_usuario}>
                    <div className="dados-usuario">
                      <span>{usuarios.email}</span>
                      <span>*****</span>
                      <span>{usuarios.nome_acesso}</span>
                    </div>
                    <div className="action-buttons">
                      <button id="edit-cliente" onClick={() => handleEditClick(usuarios.id_usuario)}>Editar</button>
                      <button id="delete-cliente" onClick={() => handleDeleteClick(usuarios.id_usuario)}>Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-cliente">Nenhum usuário encontrado.</p>
          )}
        </div>
        </div>

        {formVisible && (
          <div className="form-container">
            <div className="form-overlay" onClick={toggleForm}></div>
            <div className="form-content">
              <h2>Adicionar Novo Usuário</h2>
              <form onSubmit={handleSubmit}>
              <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} required/>
              <select className="input-style" value={idAcesso} onChange={handleIdAcessoChange} required>
                <option value="" disabled>
                  Selecione o Tipo de Acesso
                </option>
                <option value="1">Administrador</option>
                <option value="2">Funcionário</option>
              </select>              
              <button type="submit">Adicionar</button>
              </form>
            </div>
          </div>
        )}

        {formVisibleDelete && (
          <div className="form-container">
          <div className="form-overlay" onClick={toggleFormDelete}></div>
          <div className="form-content-delete">
            <h2>Excluir Usuário</h2>
            <p>Tem certeza que deseja excluir este Usuário?</p>
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
            <h2>Editar Usuário</h2>
            <form onSubmit={handleEditSubmit}>
              <div>
                <input type="checkbox" checked={editableFields.email} onChange={() => handleFieldChange('email')} />
                <label>Editar Email</label>
              </div>
              {editableFields.email && <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />}
              
              <div>
                <input type="checkbox" checked={editableFields.senha} onChange={() => handleFieldChange('senha')} />
                <label>Editar Senha</label>
              </div>
              {editableFields.senha && <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />}

              <div>
                <input type="checkbox" checked={editableFields.idAcesso} onChange={() => handleFieldChange('idAcesso')} />
                <label>Editar Tipo de Acesso</label>
              </div>
              {editableFields.idAcesso && (
                                          <select
                                          className="input-style"
                                          value={idAcesso}
                                          onChange={handleIdAcessoChange}
                                          required
                                        >
                                          <option value="" disabled>
                                            Selecione o Tipo de Acesso
                                          </option>
                                          <option value={1}>Administrador</option>
                                          <option value={2}>Funcionário</option>
                                        </select>
            )}
              
              <div className="button-save-edit">
                <button type="submit">Salvar</button>
                </div>
            </form>
          </div>
        </div>          
        )}

    </div>
  )
}

export default CrudUsuario