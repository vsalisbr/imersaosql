import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../useInput/useInput';

function CadastrarProdutoModal ({ showModal, setShowModal }) {
  const nome = useInput('');
  const precoCusto = useInput('');
  const precoVenda = useInput('');

  const handleConfirm = () => {
    console.log('cadastrar', nome);
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
      <Modal.Header>
        <Modal.Title>Cadastrar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formNome">
          <Form.Label>Nome do Produto</Form.Label>
          <Form.Control type="text" value={nome.value} onChange={nome.onChange} />
          <Form.Label>Preço de Custo</Form.Label>
          <Form.Control type="text" value={precoCusto.value} onChange={precoCusto.onChange} />
          <Form.Label>Preço de Venda</Form.Label>
          <Form.Control type="text" value={precoVenda.value} onChange={precoVenda.onChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

CadastrarProdutoModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool
}.isRequired;

export default CadastrarProdutoModal;
