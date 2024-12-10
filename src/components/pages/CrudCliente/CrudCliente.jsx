import NavigationBar from "../../NavigationBar/NavigationBar"
import { useState } from "react"
import './CrudCliente.css'

const CrudCliente = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');

  const toggleForm = () => {
    setFormVisible(!formVisible);
  }

  const handleTelefoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (value.length <= 11) {
      let formattedValue = value;
      if (value.length > 2) formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 6) formattedValue = `${formattedValue.slice(0, 9)}-${formattedValue.slice(9, 13)}`;
      setTelefone(formattedValue);
    }
  };

  const handleCpfChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (value.length <= 11) {
      let formattedValue = value;
      if (value.length > 3 && value.length <= 6) formattedValue = `${value.slice(0, 3)}.${value.slice(3)}`;
      if (value.length > 6 && value.length <= 9) formattedValue = `${formattedValue.slice(0, 7)}.${value.slice(6)}`;
      if (value.length > 9) formattedValue = `${formattedValue.slice(0, 10)}-${value.slice(9)}`;
      setCpf(formattedValue);
    }
  };

  return (
    <div>
        <NavigationBar/>
        <div className="container-cliente">
          <div className="h1-button">
            <h1 className="h1-cliente">Listagem de Cliente</h1>
            <button id="adicionar-cliente" onClick={toggleForm}>Adicionar Cliente</button>
          </div>

          {formVisible && (
            <div className="form-container">
              <div className="form-overlay" onClick={toggleForm}></div>
              <div className="form-content">
                <h2>Adicionar Novo Cliente</h2>
                <form>
                  <input type="text" placeholder="Nome do Cliente" required />
                  <input type="email" placeholder="Email" required />
                  <input type="text"
                          placeholder="Telefone"
                          value={telefone}
                          onChange={handleTelefoneChange}
                          maxLength="15"  
                          required/>
                  <textarea placeholder="Endereço" required></textarea>
                  <input type="text"
                          placeholder="CPF"
                          value={cpf}
                          onChange={handleCpfChange}
                          maxLength="14"/>
                  <button type="submit">Salvar</button>
                </form>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default CrudCliente