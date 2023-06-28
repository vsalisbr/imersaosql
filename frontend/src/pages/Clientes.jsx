import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import useCadastrarCliente from '../Hooks/useCadastrarCliente/useCadastrarCliente';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const { CadastrarClienteModal, setShowModal } = useCadastrarCliente();

  useEffect(() => {
    setClientes([
      { CLIENTES_ID: 1, CLIENTE_NOME: 'Cliente 1' },
      { CLIENTES_ID: 2, CLIENTE_NOME: 'Cliente 2' },
      { CLIENTES_ID: 3, CLIENTE_NOME: 'Cliente 3' },
      { CLIENTES_ID: 4, CLIENTE_NOME: 'Cliente 4' },
    ]);
  }, []);
  
  return (
    <>
      <div className='page-title'>
        Clientes
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='table-check'>#</th>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr 
              key={cliente.CLIENTES_ID}
              onClick={() => {
                if (clienteSelecionado === cliente.CLIENTES_ID) {
                  setClienteSelecionado(null);
                } else {
                  setClienteSelecionado(cliente.CLIENTES_ID);
                }
              }}
            >
              <td>
                <input
                  className='form-check-input'
                  type="checkbox"
                  checked={clienteSelecionado === cliente.CLIENTES_ID}
                  onChange={() => {
                    if (clienteSelecionado === cliente.CLIENTES_ID) {
                      setClienteSelecionado(null);
                    } else {
                      setClienteSelecionado(cliente.CLIENTES_ID);
                    }
                  }}
                />
              </td>
              <td>{cliente.CLIENTES_ID}</td>
              <td>{cliente.CLIENTE_NOME}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='action-buttons'>
        <button 
          className='btn btn-warning'
          disabled={clienteSelecionado === null}
        >
          Editar
        </button>
        <button 
          className='btn btn-danger'
          disabled={clienteSelecionado === null}        
        >
          Excluir
        </button>
        <button 
          className='btn btn-success'
          onClick={() => setShowModal(true)}
        >
          Novo
        </button>
      </div>
      <CadastrarClienteModal />
    </>
  );
}

export default Clientes;
