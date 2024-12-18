import React, { useEffect, useState } from 'react'
import NavigationBar from '../../NavigationBar/NavigationBar'

const CrudAgendamento = () => {

    const [clientesList, setClientesList] = useState([]); 
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [animaisList, setAnimaisList] = useState([]);
    const [animalSelecionado, setAnimalSelecionado] = useState('');
    const [tipoServico, setTipoServico] = useState('');
    const [dataInput, setDataInput] = useState('');
    const [horaInput, setHoraInput] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [status, setStatus] = useState('');

    const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/clientes');
            const data = await response.json();

            if (response.ok) {
                setClientesList(data.data);
            } else {
                alert(`Erro ao buscar clientes: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao buscar clientes', error);
            alert('Erro ao buscar clientes');
        }
    };

    const fetchAnimais = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/animais');
            const data = await response.json();
            
            if (response.ok) {
                setAnimaisList(data.data);
            } else {
                alert(`Erro ao buscar animais: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao buscar animais', error);
            alert('Erro ao buscar animais');            
        }
    }

    useEffect(() => {
        fetchClientes();
        fetchAnimais();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataHora = `${dataInput} ${horaInput}:00`;

        const agendamentoData = { id_cliente: clienteSelecionado, id_animal: animalSelecionado, id_tipo_servico: tipoServico, id_status: status, data_hora:dataHora, observacoes:observacoes };

        try {
            const response = await fetch('http://localhost:5000/api/agendamentos', {method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(agendamentoData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Agendamento adicionado com sucesso!');
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao adicionar agendamento:', error);
            alert('Erro ao adicionar agendamento');
        }
    };

    const handleSelectData = (event) => {
        setDataInput(event.target.value);
    };

    const handleSelectHora = (event) => {
        setHoraInput(event.target.value);
    };

    const handleSelectTipo = (event) => {
        setTipoServico(event.target.value);
    };

    const handleSelectObs = (event) => {
        setObservacoes(event.target.value);
    };

    const handleSelectStatus = (event) => {
        setStatus(event.target.value);
    };

  return (
    <div>
        <NavigationBar />
        <form onSubmit={handleSubmit}>
            <select className='input-style' value={tipoServico} onChange={handleSelectTipo} required>
                <option value="" disabled>
                    Selecione o Tipo de Serviço
                </option>
                <option value="8">Banho</option>
                <option value="9">Consulta veterinária</option>
                <option value="10">Vacinação</option>
                <option value="11">Tosa</option>
                <option value="12">Exame de sangue</option>
                <option value="13">Emergência</option>
                <option value="14">Cirurgia</option>
            </select>

            <select
                    className='input-style'
                    value={clienteSelecionado}
                    onChange={(e) => setClienteSelecionado(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecione o Cliente
                    </option>
                    {clientesList.map((cliente) => (
                      <option key={cliente.id_cliente} value={cliente.id_cliente}>
                        {cliente.nome_cliente}
                      </option>
                    ))}
                  </select>

                  <select
                    className='input-style'
                    value={animalSelecionado}
                    onChange={(e) => setAnimalSelecionado(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecione o Animal
                    </option>
                    {animaisList.map((animais) => (
                      <option key={animais.id_animal} value={animais.id_animal}>
                        {animais.nome_animal}
                      </option>
                    ))}
                  </select>

            <label for="data">Data do Agendamento:</label><br />
            <input className='input-style' type="date" id='date' value={dataInput} onChange={handleSelectData} required/><br />

            <label for="hora">Hora do Agendamento:</label><br />
            <input  className='input-style' type="time" id='hora' value={horaInput} onChange={handleSelectHora} required/>

            <select className='input-style' value={status} onChange={handleSelectStatus} required>
                <option value="" disabled>
                    Selecione o Status
                </option>
                <option value="1">Agendado</option>
                <option value="3">Cancelado</option>
                <option value="4">Pendente</option>
                <option value="5">Em andamento</option>
                <option value="6">Concluído</option>
            </select>            

            <input className='input-style' type="text" placeholder='Observações' value={observacoes} onChange={handleSelectObs} required/>

            <button type='submit'>Adicionar</button>
        </form>
    </div>
  )
}

export default CrudAgendamento