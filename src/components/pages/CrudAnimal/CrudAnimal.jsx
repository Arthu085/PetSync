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
    const [formVisibleEdit, setFormVisibleEdit] = useState(false);
    const [animalId, setAnimalId] = useState(null);
    const [editableFields, setEditableFields] = useState({
        nome_animal: false,
        especie: false,
        raca: false,
        idade: false,
        peso: false,
        sexo: false,
        observacoes: false,
        nome_cliente: false,
      });

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
    
  const toggleFormEdit = () => {
    setFormVisibleEdit(!formVisibleEdit)
  }

  const handleEditClick = (id_animal) => {
    setAnimalId(id_animal);
    const animal = animais.find(c => c.id_animal === id_animal);
    setNomeAnimal(animal.nome_animal);
    setEspecie(animal.especie);
    setRaca(animal.raca);
    setIdade(animal.idade);
    setPeso(animal.peso);
    setSexo(animal.sexo);
    setObservacoes(animal.observacoes);
    setClienteSelecionado(animal.clienteSelecionado)
    setEditableFields({
      nome_animal: false,
      especie: false,
      raca: false,
      idade: false,
      peso: false,
      sexo: false,
      observacoes: false,
      nome_cliente: false,
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
  
    const animalData = {};
    if (editableFields.nome_animal && nome_animal) animalData.nome_animal = nome_animal;
    if (editableFields.raca && raca) animalData.raca = raca;
    if (editableFields.especie && especie) animalData.especie = especie;
    if (editableFields.idade && idade) animalData.idade = idade;
    if (editableFields.peso && peso) animalData.peso = peso;
    if (editableFields.sexo && sexo) animalData.sexo = sexo;
    if (editableFields.observacoes && observacoes) animalData.observacoes = observacoes;
    if (editableFields.nome_cliente && clienteSelecionado) animalData.id_cliente = clienteSelecionado;
  
    // Verifique se há dados para enviar antes de tentar editar
    if (Object.keys(animalData).length === 0) {
      alert('Nenhum campo foi modificado.');
      return;
    }
  
    // Verifique se o clienteId está presente
    if (!animalId) {
      alert('ID do animal não encontrado.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/animais/${animalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Animal atualizado com sucesso!');
        fetchAnimais(); // Atualiza a lista de clientes
      } else {
        alert(`Erro ao atualizar animal: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      alert('Erro ao atualizar animal');
    }
    setFormVisibleEdit(false);
  };  

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
                      <button id="edit-cliente" onClick={() => handleEditClick(animais.id_animal)}>Editar</button>
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

        {formVisibleEdit && (
          <div className="form-container">
          <div className="form-overlay" onClick={toggleFormEdit}></div>
          <div className="form-content-edit">
            <h2>Editar Cliente</h2>
            <form onSubmit={handleEditSubmit}>
              <div>
                <input type="checkbox" checked={editableFields.nome_animal} onChange={() => handleFieldChange('nome_animal')} />
                <label>Editar Nome Animal</label>
              </div>
              {editableFields.nome_animal && <input type="text" placeholder="Nome do Animal" value={nome_animal} onChange={(e) => setNomeAnimal(e.target.value)} />}
              
              <div>
                <input type="checkbox" checked={editableFields.especie} onChange={() => handleFieldChange('especie')} />
                <label>Editar Espécie</label>
              </div>
              {editableFields.especie && <input type="text" placeholder="Espécie" value={especie} onChange={(e) => setEspecie(e.target.value)} />}
              
              <div>
                <input type="checkbox" checked={editableFields.raca} onChange={() => handleFieldChange('raca')} />
                <label>Editar Raça</label>
              </div>
              {editableFields.raca && <input type="text" placeholder="Raça" value={raca} onChange={(e) => setRaca(e.target.value)} />}
              
              <div>
                <input type="checkbox" checked={editableFields.idade} onChange={() => handleFieldChange('idade')} />
                <label>Editar Idade</label>
              </div>
              {editableFields.idade && <input type='number' placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} />}
              
              <div>
                <input type="checkbox" checked={editableFields.peso} onChange={() => handleFieldChange('peso')} />
                <label>Editar Peso</label>
              </div>
              {editableFields.peso && <input type="number" placeholder="Peso" value={peso} onChange={(e) => setPeso(e.target.value)} />}

              <div>
                <input type="checkbox" checked={editableFields.sexo} onChange={() => handleFieldChange('sexo')} />
                <label>Editar Sexo</label>
              </div>
              {editableFields.sexo && (
                                          <select
                                          className="input-style"
                                          value={sexo}
                                          onChange={handleSexoChange}
                                          required
                                        >
                                          <option value="" disabled>
                                            Selecione o Sexo
                                          </option>
                                          <option value="M">Macho</option>
                                          <option value="F">Fêmea</option>
                                        </select>
                                      )}                

              <div>
                <input type="checkbox" checked={editableFields.observacoes} onChange={() => handleFieldChange('observacoes')} />
                <label>Editar Observação</label>
              </div>
              {editableFields.observacoes && <input type="text" placeholder="Observações" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />}

              <div>
                <input type="checkbox" checked={editableFields.nome_cliente} onChange={() => handleFieldChange('nome_cliente')} />
                <label>Editar Cliente</label>
              </div>
              {editableFields.nome_cliente && (
                                      <select
                                      className="input-style"
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

export default CrudAnimal