import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import useCadastrarCliente from '../Hooks/Clientes/useCadastrarCliente/useCadastrarCliente';
import useEditarCliente from '../Hooks/Clientes/useEditarCliente/useEditarCliente';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const { CadastrarClienteModal, setShowModal: setShowModalNovo, showModal: showModalNovo } = useCadastrarCliente();
  const { EditarClienteModal, setShowModal: setShowModalEditar, showModal: showModalEditar } = useEditarCliente(clienteSelecionado);

  useEffect(() => {
    getClientes();
  }, []);

  useEffect(() => {
    if(!showModalNovo && !showModalEditar) {
      getClientes();
    }
  }, [showModalNovo, showModalEditar]);

  const getClientes = () => {
    fetch('http://localhost:9090/clientes')
      .then(response => response.json())
      .then( data => setClientes(data));
  };
  
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
          onClick={() => setShowModalEditar(true)}
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
          onClick={() => setShowModalNovo(true)}
        >
          Novo
        </button>
      </div>
      <CadastrarClienteModal />
      <EditarClienteModal />
    </>
  );
}

export default Clientes;
