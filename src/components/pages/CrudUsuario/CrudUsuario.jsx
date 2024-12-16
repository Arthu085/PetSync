import './CrudUsuario.css'
import '../CrudAnimal/CrudAnimal.css'
import NavigationBar from '../../NavigationBar/NavigationBar'
import { useEffect, useState } from 'react'

const CrudUsuario = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

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
    }

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
                      {/* <button id="edit-cliente" onClick={() => handleEditClick(usuarios.id_usuario)}>Editar</button> */}
                      {/* <button id="delete-cliente" onClick={() => handleDeleteClick(usuarios.id_usuario)}>Excluir</button> */}
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
        
    </div>
  )
}

export default CrudUsuario