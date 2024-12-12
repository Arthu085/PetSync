import './CrudAnimal.css'
import '../CrudCliente/CrudCliente.css'
import NavigationBar from '../../NavigationBar/NavigationBar'
import { useState } from 'react'

const CrudAnimal = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [nome_animal, setNomeAnimal] = useState('');
    const [especie, setEspecie] = useState('');
    const [raca, setRaca] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [sexo, setSexo] = useState('');
    const [observacoes, setObservacoes] = useState('');

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


  return (
    <div>
        <NavigationBar />
        <div className='container-animal'>
            <h1>Listagem de Animal</h1>
            <button id='adicionar-animal' onClick={toggleForm}>Adicionar animal</button>
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