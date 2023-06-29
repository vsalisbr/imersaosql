import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import './PesquisarProdutoModal.css';

const PesquisarProdutoModal = ({ showModal, setShowModal, mudarProduto }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:9090/produtos/pesquisar/?term=${searchTerm}`);
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleSelectProduct = (product) => {
    if (selectedProduct && selectedProduct.PRODUTOS_ID === product.PRODUTOS_ID) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Pesquisar Produto</Modal.Title>
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
                <th></th>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço de Custo</th>
                <th>Preço de Venda</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((product) => (
                <tr key={product.PRODUTOS_ID} onClick={() => handleSelectProduct(product)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={(selectedProduct && selectedProduct.PRODUTOS_ID === product.PRODUTOS_ID) || false}
                      onChange={() => handleSelectProduct(product)}
                    />
                  </td>
                  <td>{product.PRODUTOS_ID}</td>
                  <td>{product.PRODUTO_NOME}</td>
                  <td>{product.PRODUTO_PRECO_CUSTO}</td>
                  <td>{product.PRODUTO_PRECO_VENDA}</td>
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
          disabled={!selectedProduct}
          onClick={() => mudarProduto(selectedProduct)}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PesquisarProdutoModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
}.isRequired;

export default PesquisarProdutoModal;
