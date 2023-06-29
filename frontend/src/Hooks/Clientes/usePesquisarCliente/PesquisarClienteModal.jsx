import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import './PesquisarClienteModal.css';

const PesquisarClienteModal = ({ showModal, setShowModal, mudarCliente }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:9090/clientes/pesquisar/?term=${searchTerm}`);

      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleSelectClient = (client) => {
    if (selectedClient && selectedClient.CLIENTES_ID === client.CLIENTES_ID) {
      setSelectedClient(null);
    } else {
      setSelectedClient(client);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Pesquisar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='div-input-btn-search'>
          <input
            type="text"
            value={searchTerm}
            className='form-control'
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o termo de pesquisa"
          />
          <Button variant="primary" onClick={handleSearch}>
          Pesquisar
          </Button>
        </div>
        {searchResult.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Nome</th>
                <th>Ativo</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((client) => (
                <tr key={client.CLIENTES_ID} onClick={() => handleSelectClient(client)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={(selectedClient && selectedClient.CLIENTES_ID === client.CLIENTES_ID) || false}
                      onChange={() => handleSelectClient(client)}
                    />
                  </td>
                  <td>{client.CLIENTES_ID}</td>
                  <td>{client.CLIENTE_NOME}</td>
                  <td className='table-status'>
                    <span 
                      className={client.CLIENTE_ATIVO ? 'card-situation-activated' : 'card-situation-disabled'}
                    >
                      {client.CLIENTE_ATIVO ? 'Ativado' : 'Desativado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button 
          variant="success" 
          disabled={!selectedClient}
          onClick={() => mudarCliente(selectedClient)}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PesquisarClienteModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
}.isRequired;

export default PesquisarClienteModal;
