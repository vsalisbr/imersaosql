import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../useInput/useInput';

function CadastrarClienteModal ({ showModal, setShowModal }) {
  const nome = useInput('');
  const [clienteAtivo, setClienteAtivo] = useState(true);

  const handleConfirm = () => {
    const { value: cliente_nome } = nome;
    const cliente_ativo = clienteAtivo ? -1 : 0;
    const endPoint = 'http://localhost:9090/clientes/novo';
    const body = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cliente_nome, cliente_ativo }),
    };
    fetch(endPoint, body)
      .then(() => {
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        setShowModal(false);
      });
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
      <Modal.Header>
        <Modal.Title>Cadastrar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Nome do Cliente</Form.Label>
          <Form.Control type="text" value={nome.value} onChange={nome.onChange} />
          <Form.Check 
            label="Cliente Ativo?"
            type="checkbox" 
            id="clienteAtivo" 
            name="clienteAtivo" 
            checked={clienteAtivo}
            onChange={() => setClienteAtivo(!clienteAtivo)} 
          />          
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

CadastrarClienteModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool
}.isRequired;

export default CadastrarClienteModal;
