import './CrudAnimal.css'
import '../CrudCliente/CrudCliente.css'
import NavigationBar from '../../NavigationBar/NavigationBar'
import { useEffect, useState } from 'react'

const CrudAnimal = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [nome_animal, setNomeAnimal] = useState('');
    const [especie, setEspecie] = useState('');
    const [raca, setRaca] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [sexo, setSexo] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [nome_cliente, setAnimalCliente] = useState('')
    const [animais, setAnimais] = useState([])

    const toggleForm = () => {
        setFormVisible(!formVisible)
        if (!formVisible) {
            setNomeAnimal('');
            setEspecie('');
            setRaca('');
            setIdade('');
            setPeso('');
            setSexo('');
            setObservacoes('');
        }
    }

    const fetchAnimais = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/animais');
        const data = await response.json();
        if (response.ok) {
          setAnimais(data.data);
        } else {
          alert(`Erro ao buscar animais: ${data.message}`);
        }
      } catch (erro) {
        console.error('Erro ao buscar animais:', error);
        alert('Erro ao buscar animais');
      }
    }

    useEffect(() => {
      fetchAnimais();
    }, []);

  return (
    <div>
        <NavigationBar />
        <div className='container-animal'>
            <div className='h1-animais'>
              <h1>Listagem de Animal</h1>
              <button id='adicionar-animal' onClick={toggleForm}>Adicionar animal</button>
            </div>
        <div className="animais-list">
          {animais.length > 0 ? (
            <div>
              <div className="animais-cabecario">
                <span>Nome do Animal</span>
                <span>Espécie</span>
                <span>Raça</span>
                <span>Idade</span>
                <span>Peso</span>
                <span>Sexo</span>
                <span>Observações</span>
                <span>Nome do Cliente</span>
              </div>
              <ul className="ul-animal">
                {animais.map((animais) => (
                  <li className="li-animal" key={animais.id_animal}>
                    <div className="dados-animal">
                      <span>{animais.nome_animal}</span>
                      <span>{animais.especie}</span>
                      <span>{animais.raca}</span>
                      <span>{animais.idade}</span>
                      <span>{animais.peso}</span>
                      <span>{animais.sexo}</span>
                      <span>{animais.observacoes}</span>
                      <span>{animais.nome_cliente}</span>
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
            <p className="no-cliente">Nenhum animal encontrado.</p>
          )}
        </div>
      </div>

        {formVisible && (
          <div className="form-container">
            <div className="form-overlay" onClick={toggleForm}></div>
            <div className="form-content">
              <h2>Adicionar Novo Animal</h2>
              <form>
                <button type="submit">Adicionar</button>
              </form>
            </div>
          </div>
        )}
    </div>
  )
}

export default CrudAnimal