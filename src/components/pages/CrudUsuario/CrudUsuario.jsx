import './CrudUsuario.css'
import '../CrudAnimal/CrudAnimal.css'
import NavigationBar from '../../NavigationBar/NavigationBar'
import { useEffect, useState } from 'react'

const CrudUsuario = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [formVisibleDelete, setFormVisibleDelete] = useState(false);
    const [usuarioExcluirId, setUsuarioExcluirId] = useState(null);
    const [formVisibleEdit, setFormVisibleEdit] = useState(false);
    const [usuarioId, setUsuarioId] = useState(null);
    const [editableFields, setEditableFields] = useState({
        email: false,
        senha: false,
    });
    
    const toggleForm = () => {
        setFormVisible(!formVisible)
        if (!formVisible) {
            setEmail('');
            setSenha('');
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
        const usuarioData = { email, senha }
        try {
            const response = await fetch('http://localhost:5000/api/auth/registrar', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(usuarioData)
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
        console.error('Erro ao adicionar usuário:', error)
        alert('Erro ao adicionar usuário.')
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
        try {
            const response = await fetch(`http://localhost:5000/api/usuarios/${usuarioExcluirId}`, {
        method: 'DELETE',  
        });
        const data = await response.json();
        if (response.ok) {
            alert('Usuário deletado com sucesso!');
            fetchUsuarios();
        } else {
            alert(`Erro ao deletar usuário:`, error);
        }
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert('Erro ao deletar usuário');
    }
    setFormVisibleDelete(false);
    }

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
        setEditableFields({
            email: false,
            senha: false,
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


        // Verifique se há dados para enviar antes de tentar editar
        if (Object.keys(usuarioData).length === 0) {
          alert('Nenhum campo foi modificado.');
          return;
        }
      
        // Verifique se o clienteId está presente
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
          } else {
            alert(`Erro ao atualizar usuário: ${data.message}`);
          }
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
          alert('Erro ao atualizar usuário');
        }
        setFormVisibleEdit(false);
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
              </div>
              <ul className="ul-usuario">
                {usuarios.map((usuarios) => (
                  <li className="li-usuario" key={usuarios.id_usuario}>
                    <div className="dados-usuario">
                      <span>{usuarios.email}</span>
                      <span>*****</span>
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