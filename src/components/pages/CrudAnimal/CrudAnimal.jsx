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
    const [nome_cliente, setAnimalCliente] = useState([])
    const [animais, setAnimais] = useState([])
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [formVisibleDelete, setFormVisibleDelete] = useState(false);
    const [animalExcluirId, setAnimalExcluirId] = useState(null);

    const handleSexoChange = (event) => {
      setSexo(event.target.value);
    }

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
            setClienteSelecionado('');
        }
    }

    const fetchAnimais = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/animais');
        const data = await response.json();

        const response_cliente = await fetch('http://localhost:5000/api/clientes');
        const data_cliente = await response_cliente.json();

        if (response.ok && response_cliente.ok) {
          setAnimais(data.data);
          // Extraindo clientes únicos
          const clientesUnicos = data_cliente.data.reduce((acc, curr) => {
            if (!acc.some((cliente) => cliente.id_cliente === curr.id_cliente)) {
              acc.push({ id_cliente: curr.id_cliente, nome_cliente: curr.nome_cliente });
            }
            return acc;
          }, []);
          setAnimalCliente(clientesUnicos);
        } else {
          alert(`Erro ao buscar animais: ${data.message}`);
        }
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
        alert('Erro ao buscar animais');
      }
    };

    useEffect(() => {
      fetchAnimais();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const animalData = { nome_animal, especie, raca, idade, peso, sexo, observacoes, id_cliente: clienteSelecionado}
      try {
        const response = await fetch('http://localhost:5000/api/animais', {method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(animalData),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Animal adicionado com sucesso!');
          fetchAnimais();
          setFormVisible(false);          
        } else {
          alert(`Erro: ${data.message}`);
        }
      } catch (error) {
        console.error('Erro ao adicionar animal:', error);
        alert('Erro ao adicionar animal');        
      }
    }

    const toggleFormDelete = () => {
      setFormVisibleDelete(!formVisibleDelete)
    }

    const handleDeleteClick = (id_animal) => {
      setAnimalExcluirId(id_animal);
      setFormVisibleDelete(true);
    }

    const handleConfirmDelete = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/animais/${animalExcluirId}`, {
        method: 'DELETE',  
      });
      const data = await response.json();
      if (response.ok) {
        alert('Animal deletado com sucesso!');
        fetchAnimais();
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao deletar animal:', error);
      alert('Erro ao deletar animal');
    }
    setFormVisibleDelete(false);        
  };

  const handleCancelDelete = () => setFormVisibleDelete(false);
    
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
                      <span>{animais.sexo === "M" ? "Macho" : "Fêmea"}</span>
                      <span>{animais.observacoes}</span>
                      <span>{animais.nome_cliente}</span>
                    </div>
                    <div className="action-buttons">
                      <button id="edit-cliente" onClick={() => handleEditClick(cliente.id_cliente)}>Editar</button>
                      <button id="delete-cliente" onClick={() => handleDeleteClick(animais.id_animal)}>Excluir</button>
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
              <form onSubmit={handleSubmit}>
              <input type="text" placeholder='Nome do Animal' value={nome_animal} onChange={(e) => setNomeAnimal(e.target.value)} required/>
              <input type="text" placeholder='Espécie' value={especie} onChange={(e) => setEspecie(e.target.value)} required/>
              <input type="text" placeholder='Raça' value={raca} onChange={(e) => setRaca(e.target.value)} required/>
              <input type="number" placeholder='Idade' value={idade} onChange={(e) => setIdade(e.target.value)} required/>
              <input type="number" placeholder='Peso' value={peso} onChange={(e) => setPeso(e.target.value)} required/>
              <select className="input-style" value={sexo} onChange={handleSexoChange} required>
                <option value="" disabled>
                  Selecione o Sexo
                </option>
                <option value="M">Macho</option>
                <option value="F">Fêmea</option>
              </select>
              <input type="text" placeholder='Observações' value={observacoes} onChange={(e) => setObservacoes(e.target.value)} required/>
              <select
                    className='input-style'
                    value={clienteSelecionado}
                    onChange={(e) => setClienteSelecionado(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecione o cliente
                    </option>
                    {nome_cliente.map((cliente) => (
                      <option key={cliente.id_cliente} value={cliente.id_cliente}>
                        {cliente.nome_cliente}
                      </option>
                    ))}
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
            <h2>Excluir Animal</h2>
            <p>Tem certeza que deseja excluir este animal?</p>
            <div className="answer-buttons">
              <button onClick={handleConfirmDelete}>Confirmar</button>
              <button onClick={handleCancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>          
        )}
    </div>
  )
}

export default CrudAnimal