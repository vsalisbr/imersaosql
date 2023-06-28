import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import useCadastrarCliente from '../Hooks/Clientes/useCadastrarCliente/useCadastrarCliente';
import useEditarCliente from '../Hooks/Clientes/useEditarCliente/useEditarCliente';
import useDeletarCliente from '../Hooks/Clientes/useDeletarCliente/useDeletarCliente';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const { CadastrarClienteModal, setShowModal: setShowModalNovo, showModal: showModalNovo } = useCadastrarCliente();
  const { EditarClienteModal, setShowModal: setShowModalEditar, showModal: showModalEditar } = useEditarCliente(clienteSelecionado);
  const { DeletarClienteModal, setShowModal: setShowModalDeletar, showModal: showModalDeletar } = useDeletarCliente(clienteSelecionado);

  useEffect(() => {
    getClientes();
  }, []);

  useEffect(() => {
    if(!showModalNovo && !showModalEditar && !showModalDeletar) {
      setClienteSelecionado(null);
      getClientes();
    }
  }, [showModalNovo, showModalEditar, showModalDeletar]);

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
            <th className='table-id'>ID</th>
            <th className='table-name'>Nome</th>
            <th className='table-status'>Status</th>
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
              <td className='table-status'>
                <span 
                  className={cliente.CLIENTE_ATIVO ? 'card-situation-activated' : 'card-situation-disabled'}
                >
                  {cliente.CLIENTE_ATIVO ? 'Ativado' : 'Desativado'}
                </span>
              </td>
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
          onClick={() => setShowModalDeletar(true)}
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
      <DeletarClienteModal />
    </>
  );
}

export default Clientes;
